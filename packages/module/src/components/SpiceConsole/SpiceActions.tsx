import React from 'react';
import {
	Dropdown as DropdownDeprecated,
	DropdownItem as DropdownItemDeprecated,
	DropdownToggle as DropdownToggleDeprecated
} from '@patternfly/react-core/deprecated';

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

  return (
    <DropdownDeprecated
      id="console-send-shortcut"
      onSelect={() => {
        setIsOpen(!isOpen);
        onCtrlAltDel();
      }}
      isOpen={isOpen}
      toggle={
        <DropdownToggleDeprecated onToggle={(_event, isDropdownOpen) => setIsOpen(isDropdownOpen)}>{textSendShortcut}</DropdownToggleDeprecated>
      }
      dropdownItems={[<DropdownItemDeprecated key="ctrl-alt-delete">{textCtrlAltDel}</DropdownItemDeprecated>]}
    />
  );
};
SpiceActions.displayName = 'SpiceActions';
