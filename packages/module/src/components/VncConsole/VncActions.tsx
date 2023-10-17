import React from 'react';
import { css } from '@patternfly/react-styles';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { Dropdown, DropdownItem, DropdownList, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

import styles from '@patternfly/react-styles/css/components/Consoles/VncConsole';

export interface VncActionProps {
  onDisconnect: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCtrlAltDel: () => void;

  textCtrlAltDel?: string;
  textSendShortcut?: string;
  textDisconnect?: string;

  /** VNC console additional action elements */
  additionalButtons?: React.ReactNode[];
}
export const VncActions: React.FunctionComponent<VncActionProps> = ({
  textSendShortcut = 'Send Key',
  textCtrlAltDel = 'Ctrl+Alt+Del',
  textDisconnect = 'Disconnect',
  onCtrlAltDel = undefined,
  onDisconnect,
  additionalButtons = []
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent>, _value: string | number) => {
    setIsOpen(false);
  };
  const toolbar = (
    <div className={css(styles.consoleActionsVnc)}>
      {additionalButtons}
      <Dropdown
        id="pf-v5-c-console__send-shortcut"
        isOpen={isOpen}
        onSelect={onSelect}
        onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
            {textSendShortcut}
          </MenuToggle>
        )}
      >
        <DropdownList>
          <DropdownItem onClick={onCtrlAltDel} key="ctrl-alt-delete">
            {textCtrlAltDel}
          </DropdownItem>
        </DropdownList>
      </Dropdown>
      <Button variant={ButtonVariant.secondary} onClick={onDisconnect}>
        {textDisconnect}
      </Button>
    </div>
  );

  return toolbar;
};
VncActions.displayName = 'VncActions';
