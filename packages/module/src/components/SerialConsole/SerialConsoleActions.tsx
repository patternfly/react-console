import { Button } from '@patternfly/react-core';

export interface SerialConsoleActionsProps extends React.HTMLProps<HTMLDivElement> {
  onDisconnect: () => void;
  onReset: () => void;
  textDisconnect?: string;
  textReset?: string;
}

export const SerialConsoleActions: React.FunctionComponent<SerialConsoleActionsProps> = ({
  textDisconnect = 'Disconnect',
  textReset = 'Reset',
  ...props
}: SerialConsoleActionsProps) => (
  <div
    className="console-actions-serial"
    style={{
      gridArea: 'actions-extra',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--pf-t--global--spacer--sm)'
    }}
  >
    <Button variant="secondary" onClick={props.onDisconnect}>
      {textDisconnect}
    </Button>
    <Button variant="secondary" onClick={props.onReset}>
      {textReset}
    </Button>
  </div>
);
SerialConsoleActions.displayName = 'SerialConsoleActions';
