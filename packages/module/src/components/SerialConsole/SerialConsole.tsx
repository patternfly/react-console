import { useEffect, forwardRef } from 'react';

import { Button, EmptyState, Spinner, EmptyStateFooter } from '@patternfly/react-core';

import { XTerm, XTermProps } from './XTerm';
import { SerialConsoleActions } from './SerialConsoleActions';

import { constants } from '../common/constants';

import { createUseStyles } from 'react-jss';

const { CONNECTED, DISCONNECTED, LOADING } = constants;

const useStyles = createUseStyles({
  consoleSerial: {
    gridArea: 'main'
  }
});

export interface SerialConsoleProps extends XTermProps {
  /** Initiate connection to backend. In other words, the calling components manages connection state. */
  onConnect: () => void;
  /** Close connection to backend */
  onDisconnect: () => void;
  /** Terminal produced data, like key-press */
  onData: (e: string) => void;
  /** Terminal title has been changed */
  onTitleChanged?: () => void;
  /** Connection status; a value from [''connected'; 'disconnected'; 'loading']. Default is 'loading' for a not matching value. */
  /** The number of columns to resize to */
  cols?: number;
  /** The number of rows to resize to */
  rows?: number;
  fontFamily?: string;
  fontSize?: number;
  status?: string;
  /** Text content rendered inside the Connect button */
  textConnect?: string;
  /** Text content rendered inside the Disconnect button */
  textDisconnect?: string;
  /** Text content rendered inside the Reset button */
  textReset?: string;
  /* Text content rendered inside the EmptyState for when console is disconnnected */
  textDisconnected?: string;
  /* Text content rendered inside the EmptyState for when console is loading */
  textLoading?: string;
  /** A reference object to attach to the SerialConsole. */
  innerRef?: React.RefObject<any>;
}

const SerialConsoleBase: React.FunctionComponent<SerialConsoleProps> = ({
  onConnect,
  onDisconnect,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTitleChanged = () => {},
  onData,
  cols,
  rows,
  fontFamily,
  fontSize,
  status = 'loading',
  textConnect = 'Connect',
  textDisconnect,
  textReset,
  textDisconnected = 'Click Connect to open serial console.',
  textLoading = 'Loading ...',
  innerRef
}) => {
  const styles = useStyles();

  useEffect(() => {
    onConnect();
    return () => {
      onDisconnect();
    };
  }, [onConnect, onDisconnect]);

  const onConnectClick = () => {
    onConnect();
    focusTerminal();
  };

  const onDisconnectClick = () => {
    onDisconnect();
    focusTerminal();
  };

  const onResetClick = () => {
    onDisconnect();
    onConnect();
    focusTerminal();
  };

  const focusTerminal = () => {
    innerRef && innerRef.current && innerRef.current.focusTerminal();
  };

  let terminal;
  switch (status) {
    case CONNECTED:
      terminal = (
        <XTerm
          innerRef={innerRef}
          cols={cols}
          rows={rows}
          fontFamily={fontFamily}
          fontSize={fontSize}
          onTitleChanged={onTitleChanged}
          onData={onData}
        />
      );
      break;
    case DISCONNECTED:
      terminal = (
        <EmptyState titleText={textDisconnected}>
          <EmptyStateFooter>
            <Button onClick={onConnectClick}>{textConnect}</Button>
          </EmptyStateFooter>
        </EmptyState>
      );
      break;
    case LOADING:
    default:
      terminal = <EmptyState icon={Spinner} titleText={textLoading}></EmptyState>;
      break;
  }

  return (
    <>
      {status !== DISCONNECTED && (
        <SerialConsoleActions
          onDisconnect={onDisconnectClick}
          onReset={onResetClick}
          textDisconnect={textDisconnect}
          textReset={textReset}
        />
      )}
      <div className={styles.consoleSerial}>{terminal}</div>
    </>
  );
};
SerialConsoleBase.displayName = 'SerialConsoleBase';
export const SerialConsole = forwardRef((props: SerialConsoleProps, ref: React.Ref<HTMLDivElement>) => (
  <SerialConsoleBase innerRef={ref as React.MutableRefObject<any>} {...props} />
));
SerialConsole.displayName = 'SerialConsole';
