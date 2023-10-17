import React from 'react';
import { Dropdown, DropdownItem, DropdownList, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

export interface SpiceActionsProps extends React.HTMLProps<HTMLDivElement> {
  /** Callback for when Ctrl+Alt+Delete item is selected */
  onCtrlAltDel?: () => void;
  /** Text for the Dropdown Ctrl+Alt+Delety item */
  textCtrlAltDel?: string;
  /** Text for the Dropdown toggle button */
  textSendShortcut?: string;
}
export const SpiceActions: React.FunctionComponent<SpiceActionsProps> = ({
  textSendShortcut = 'Send Key',
  textCtrlAltDel = 'Ctrl+Alt+Del',
  onCtrlAltDel
}: SpiceActionsProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent>, _value: string | number) => {
    setIsOpen(false);
    onCtrlAltDel();
  };

  return (
    <Dropdown
      id="console-send-shortcut"
      onSelect={onSelect}
      isOpen={isOpen}
      onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
          {textSendShortcut}
        </MenuToggle>
      )}
    >
      <DropdownList>
        <DropdownItem key="ctrl-alt-delete">{textCtrlAltDel}</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};
SpiceActions.displayName = 'SpiceActions';
