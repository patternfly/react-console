import {useState, Children, Fragment } from 'react';
import {
	MenuToggle,
	MenuToggleElement,
  Select,
	SelectOption,
	SelectList
} from '@patternfly/react-core';

import { constants } from '../common/constants';
import { createUseStyles } from 'react-jss';

const { NONE_TYPE, SERIAL_CONSOLE_TYPE, VNC_CONSOLE_TYPE, DESKTOP_VIEWER_CONSOLE_TYPE } = constants;

const useStyles = createUseStyles({
  console: {
    display: 'grid',
    gridTemplateAreas: '\'actions-main actions-extra\'\n    \'main main\'',
    rowGap: 'var(--pf-t--global--spacer--md)'
  },
  consoleActions: {
    gridArea: 'actions-main',
    display: 'flex',
    '> div': {
      marginRight: 'var(--pf-t--global--spacer--sm)'
    }
  }
});

const getChildTypeName = (child: any) =>
  child && child.props && child.props.type ? child.props.type : (child && child.type && child.type.displayName) || null;

const isChildOfType = (child: any, type: string) => {
  if (child && child.props && child.props.type) {
    return child.props.type === type;
  } else if (child && child.type) {
    return child.type.displayName === type;
  }
  return false;
};

export interface AccessConsolesProps {
  /**
   * Child element can be either
   *   - <SerialConsole>, <VncConsole> or <DesktopViewer>
   *   - or has a property "type" of value either SERIAL_CONSOLE_TYPE or VNC_CONSOLE_TYPE (useful when wrapping (composing) basic console components
   */
  children?: React.ReactElement[] | React.ReactNode;
  /** Placeholder text for the console selection */
  textSelectConsoleType?: string;
  /** The value for the Serial Console option. This can be overriden by the type property of the child component */
  textSerialConsole?: string;
  /** The value for the VNC Console option. This can be overriden by the type property of the child component */
  textVncConsole?: string;
  /** The value for the Desktop Viewer Console option. This can be overriden by the type property of the child component */
  textDesktopViewerConsole?: string;
  /** Initial selection of the Select */
  preselectedType?: string; // NONE_TYPE | SERIAL_CONSOLE_TYPE | VNC_CONSOLE_TYPE | DESKTOP_VIEWER_CONSOLE_TYPE;
}

export const AccessConsoles: React.FunctionComponent<AccessConsolesProps> = ({
  children,
  textSelectConsoleType = 'Select console type',
  textSerialConsole = 'Serial console',
  textVncConsole = 'VNC console',
  textDesktopViewerConsole = 'Desktop viewer',
  preselectedType = null
}) => {
  const styles = useStyles();
  const typeMap = {
    [SERIAL_CONSOLE_TYPE]: textSerialConsole,
    [VNC_CONSOLE_TYPE]: textVncConsole,
    [DESKTOP_VIEWER_CONSOLE_TYPE]: textDesktopViewerConsole
  };
  const [type, setType] = useState(
    preselectedType !== NONE_TYPE ? { value: preselectedType, toString: () => typeMap[preselectedType] } : null
  );
  const [isOpen, setIsOpen] = useState(false);

  const getConsoleForType = (type: any) =>
    Children.map(children as React.ReactElement[], (child: any) => {
      if (getChildTypeName(child) === type.value) {
        return <Fragment key={getChildTypeName(child)}>{child}</Fragment>;
      } else {
        return null;
      }
    });

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      id="pf-v6-c-console__type-selector"
      onClick={onToggleClick}
      aria-label="Console type toggle"
      isExpanded={isOpen}
      style={
        {
          width: '100%'
        } as React.CSSProperties
      }
    >
      {type.toString()}
    </MenuToggle>
  );

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent>, value: string | number) => {
    setType(value as unknown as React.SetStateAction<{ value: string; toString: () => string }>);
    setIsOpen(false);
  };
  const selectOptions: any[] = [];

  Children.toArray(children as React.ReactElement[]).forEach((child: any) => {
    if (isChildOfType(child, VNC_CONSOLE_TYPE)) {
      selectOptions.push(
        <SelectOption
          key={VNC_CONSOLE_TYPE}
          id={VNC_CONSOLE_TYPE}
          value={{ value: VNC_CONSOLE_TYPE, toString: () => textVncConsole }}
        >
          {textVncConsole}
        </SelectOption>
      );
    } else if (isChildOfType(child, SERIAL_CONSOLE_TYPE)) {
      selectOptions.push(
        <SelectOption
          key={SERIAL_CONSOLE_TYPE}
          id={SERIAL_CONSOLE_TYPE}
          value={{ value: SERIAL_CONSOLE_TYPE, toString: () => textSerialConsole }}
        >
          {textSerialConsole}
        </SelectOption>
      );
    } else if (isChildOfType(child, DESKTOP_VIEWER_CONSOLE_TYPE)) {
      selectOptions.push(
        <SelectOption
          key={DESKTOP_VIEWER_CONSOLE_TYPE}
          id={DESKTOP_VIEWER_CONSOLE_TYPE}
          value={{ value: DESKTOP_VIEWER_CONSOLE_TYPE, toString: () => textDesktopViewerConsole }}
        >
          {textDesktopViewerConsole}
        </SelectOption>
      );
    } else {
      const typeText = getChildTypeName(child);
      selectOptions.push(
        <SelectOption key={typeText} id={typeText} value={{ value: typeText, toString: () => typeText }}>
          {typeText}
        </SelectOption>
      );
    }
  });
  return (
    <div className={styles.console}>
      {Children.toArray(children).length > 1 && (
        <div className={styles.consoleActions}>
          <Select
            aria-label={textSelectConsoleType}
            toggle={toggle}
            onSelect={onSelect}
            isOpen={isOpen}
            selected={type}
            onOpenChange={(isOpen) => setIsOpen(isOpen)}
          >
            <SelectList>{selectOptions}</SelectList>
          </Select>
        </div>
      )}
      {type && getConsoleForType(type)}
    </div>
  );
};
AccessConsoles.displayName = 'AccessConsoles';
