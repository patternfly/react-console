import { useRef, useState, useCallback, useEffect, Fragment } from 'react';

import { Button, EmptyState, Spinner, EmptyStateFooter } from '@patternfly/react-core';

import { initLogging } from '@novnc/novnc/lib/util/logging';
/** Has bad types. https://github.com/larryprice/novnc-core/issues/5 */
import RFB from '@novnc/novnc/lib/rfb';

import { VncActions } from './VncActions';
import { constants } from '../common/constants';

import { createUseStyles } from 'react-jss';

const { CONNECTED, CONNECTING, DISCONNECTED } = constants;

const useStyles = createUseStyles({
  consoleVnc: {
    gridArea: 'main'
  }
});

export interface VncConsoleProps extends React.HTMLProps<HTMLDivElement> {
  /** Children nodes */
  children?: React.ReactNode;

  /** FQDN or IP to connect to */
  host: string;
  /** TCP Port */
  port?: string;
  /** host:port/path */
  path?: string;
  encrypt?: boolean;
  /** Is a boolean indicating if a request to resize the remote session should be sent whenever the container changes dimensions */
  resizeSession?: boolean;
  /** Is a boolean indicating if the remote session should be clipped to its container */
  clipViewport?: boolean;
  /** Is a boolean indicating if mouse events should control the relative position of a clipped remote session.*/
  dragViewport?: boolean;
  /** Is a boolean indicating if the remote session should be scaled locally so it fits its container */
  scaleViewport?: boolean;
  /** Is a boolean indicating if any events (e.g. key presses or mouse movement) should be prevented from being sent to the server */
  viewOnly?: boolean;
  /** Is a boolean indicating if the remote server should be shared or if any other connected clients should be disconnected */
  shared?: boolean;
  /** An Object specifying the credentials to provide to the server when authenticating
   * { username: '' password: '' target: ''}
   */
  credentials?: object;
  /** A DOMString specifying the ID to provide to any VNC repeater encountered */
  repeaterID?: string;
  /** log-level for noVNC */
  vncLogging?: 'error' | 'warn' | 'none' | 'debug' | 'info';
  consoleContainerId?: string;
  additionalButtons?: React.ReactNode[];

  /** Callback. VNC server disconnected. */
  onDisconnected?: (e: any) => void;
  /** Initialization of RFB failed */
  onInitFailed?: (e: any) => void;
  /** Handshake failed */
  onSecurityFailure?: (e: any) => void;

  /* Text content rendered inside the EmptyState in the "Connect' button for when console is disconnnected */
  textConnect?: string;
  /* Text content rendered inside the EmptyState for when console is connecting */
  textConnecting?: string | React.ReactNode;
  /* Text content rendered inside the EmptyState for when console is disconnnected */
  textDisconnected?: string;
  /** Text content rendered inside the Disconnect button */
  textDisconnect?: string;
  /** Text content rendered inside the button Send shortcut dropdown toggle */
  textSendShortcut?: string;
  /** Text content rendered inside the Ctrl-Alt-Delete dropdown entry */
  textCtrlAltDel?: string;
}

export const VncConsole: React.FunctionComponent<VncConsoleProps> = ({
  children,
  host,
  port = '80',
  path = '',
  encrypt = false,
  resizeSession = true,
  clipViewport = false,
  dragViewport = false,
  scaleViewport = false,
  viewOnly = false,
  shared = false,
  credentials,
  repeaterID = '',
  vncLogging = 'warn',
  consoleContainerId,
  additionalButtons = [] as React.ReactNode[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDisconnected = () => {},
  onInitFailed,
  onSecurityFailure,
  textConnect = 'Connect',
  textConnecting = 'Connecting',
  textDisconnected = 'Click Connect to open the VNC console.',
  textDisconnect = 'Disconnect',
  textSendShortcut,
  textCtrlAltDel
}) => {
  const rfb = useRef<any>(null);
  const styles = useStyles();

  const novncElem = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(CONNECTING);

  const onConnected = () => {
    setStatus(CONNECTED);
  };

  const _onDisconnected = useCallback(
    (e: any) => {
      setStatus(DISCONNECTED);
      onDisconnected(e);
    },
    [onDisconnected]
  );

  const _onSecurityFailure = useCallback(
    (e: any) => {
      setStatus(DISCONNECTED);
      onSecurityFailure(e);
    },
    [onSecurityFailure]
  );

  const onCtrlAltDel = () => {
    if (rfb.current) {
      rfb?.current?.sendCtrlAltDel();
    }
  };

  const addEventListeners = useCallback(() => {
    if (rfb.current) {
      rfb.current?.addEventListener('connect', onConnected);
      rfb.current?.addEventListener('disconnect', _onDisconnected);
      rfb.current?.addEventListener('securityfailure', _onSecurityFailure);
    }
  }, [rfb, _onDisconnected, _onSecurityFailure]);

  const removeEventListeners = useCallback(() => {
    if (rfb.current) {
      rfb.current.removeEventListener('connect', onConnected);
      rfb.current.removeEventListener('disconnect', _onDisconnected);
      rfb.current.removeEventListener('securityfailure', _onSecurityFailure);
    }
  }, [rfb, _onDisconnected, _onSecurityFailure]);

  const connect = useCallback(() => {
    const protocol = encrypt ? 'wss' : 'ws';
    const url = `${protocol}://${host}:${port}/${path}`;

    const options = {
      repeaterID,
      shared,
      credentials
    };
    rfb.current = new RFB(novncElem.current, url, options);
    addEventListeners();
    rfb.current.viewOnly = viewOnly;
    rfb.current.clipViewport = clipViewport;
    rfb.current.dragViewport = dragViewport;
    rfb.current.scaleViewport = scaleViewport;
    rfb.current.resizeSession = resizeSession;
  }, [
    addEventListeners,
    host,
    path,
    port,
    resizeSession,
    clipViewport,
    dragViewport,
    scaleViewport,
    viewOnly,
    encrypt,
    rfb,
    repeaterID,
    shared,
    credentials
  ]);

  useEffect(() => {
    initLogging(vncLogging);
    try {
      connect();
    } catch (e) {
      onInitFailed && onInitFailed(e);
      rfb.current = undefined;
    }

    return () => {
      disconnect();
      removeEventListeners();
      rfb.current = undefined;
    };
  }, [connect, onInitFailed, removeEventListeners, vncLogging]);

  const disconnect = () => {
    if (!rfb.current) {
      return;
    }
    rfb.current.disconnect();
  };

  let rightContent;
  let emptyState;
  switch (status) {
    case CONNECTED:
      rightContent = (
        <VncActions
          onCtrlAltDel={onCtrlAltDel}
          textSendShortcut={textSendShortcut}
          textCtrlAltDel={textCtrlAltDel}
          textDisconnect={textDisconnect}
          onDisconnect={disconnect}
          additionalButtons={additionalButtons}
        />
      );
      break;
    case DISCONNECTED:
      emptyState = (
        <EmptyState titleText={textDisconnected}>
          <EmptyStateFooter>
            <Button variant="primary" onClick={connect}>
              {textConnect}
            </Button>
          </EmptyStateFooter>
        </EmptyState>
      );
      break;
    case CONNECTING:
    default:
      emptyState = <EmptyState icon={Spinner} titleText={textConnecting}></EmptyState>;
  }

  return (
    <>
      {rightContent}
      <div className={styles.consoleVnc}>
        {children}
        <Fragment>
          <div>
            {emptyState}
            <div id={consoleContainerId} ref={novncElem} />
          </div>
        </Fragment>
      </div>
    </>
  );
};
VncConsole.displayName = 'VncConsole';
