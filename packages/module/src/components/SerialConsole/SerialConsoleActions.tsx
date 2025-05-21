import { Button } from '@patternfly/react-core';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  consoleActionsSerial: {
    gridArea: 'actions-extra',
    display: 'flex',
    justifyContent: 'flex-end',
    '> button': {
      marginRight: 'var(--pf-t--global--spacer--sm)'
    }
  }
});
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
  <div className={useStyles().consoleActionsSerial}>
    <Button variant="secondary" onClick={props.onDisconnect}>
      {textDisconnect}
    </Button>
    <Button variant="secondary" onClick={props.onReset}>
      {textReset}
    </Button>
  </div>
);
SerialConsoleActions.displayName = 'SerialConsoleActions';
