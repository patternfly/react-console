import { useRef, useState, useCallback, useEffect } from 'react';
import { css } from '@patternfly/react-styles';
import { SpiceMainConn, sendCtrlAltDel } from '@spice-project/spice-html5';

import { constants } from '../common/constants';
import { SpiceActions } from './SpiceActions';

const { CONNECTED, CONNECTING, DISCONNECTED } = constants;

export interface SpiceConsoleProps extends React.HTMLProps<HTMLDivElement> {
  /** Children nodes */
  children?: React.ReactNode;
  /** FQDN or IP to connect to */
  host?: string;
  /** TCP Port */
  port?: string;
  /** host:port/path */
  path?: string;
  /** Enable use of TLS encryption on the SPICE server */
  encrypt?: boolean;
  /** token */
  password?: string;
  /** Additional classes added to the component */
  className?: string;

  /** Callback. Spice server disconnected. */
  onDisconnected?: (e: any) => void;
  /** Initialization of Spice failed */
  onInitFailed?: (e: any) => void;

  textConnecting?: string;
  textDisconnected?: string;
  textSendShortcut?: string;
  textCtrlAltDel?: string;
}

export const SpiceConsole: React.FunctionComponent<SpiceConsoleProps> = ({
  children = null,
  host = '',
  port = '80',
  path = '',
  encrypt = false,
  password,
  className = '',
  onDisconnected,
  onInitFailed,
  textConnecting = 'Connecting',
  textDisconnected = 'Disconnected',
  textSendShortcut,
  textCtrlAltDel
}) => {
  let spiceStaticComponent: React.ReactNode;
  const scRef = useRef<any>(null);
  const [status, setStatus] = useState(CONNECTING);

  const disconnect = useCallback(() => {
    if (scRef.current) {
      scRef.current.stop();
      scRef.current = undefined;
    }
  }, [scRef]);

  const onSpiceError = useCallback(
    (e: any) => {
      disconnect();
      setStatus(DISCONNECTED);
      onDisconnected(e);
    },
    [disconnect, setStatus, onDisconnected]
  );

  useEffect(() => {
    try {
      const protocol = encrypt ? 'wss' : 'ws';
      const uri = `${protocol}://${host}:${port}/${path}`;

      scRef.current = new SpiceMainConn({
        uri,
        /* eslint-disable camelcase */
        screen_id: 'spice-screen',
        password,
        onerror: onSpiceError,
        onsuccess: setStatus(CONNECTED)
      });
    } catch (e) {
      onInitFailed && onInitFailed(e);
      disconnect();
    }
    return () => disconnect();
  }, [disconnect, encrypt, host, onInitFailed, onSpiceError, password, path, port]);

  const onCtrlAltDel = () => {
    if (scRef.current) {
      sendCtrlAltDel();
    }
  };

  if (!spiceStaticComponent) {
    // create just once
    spiceStaticComponent = <div id="spice-screen" />;
  }

  return (
    <div className={css('spice-console', className)}>
      {children}
      <div>
        {status === CONNECTED && (
          <SpiceActions
            onCtrlAltDel={onCtrlAltDel}
            textSendShortcut={textSendShortcut}
            textCtrlAltDel={textCtrlAltDel}
          />
        )}
      </div>
      <div>
        {(status === DISCONNECTED || status === CONNECTING) && (
          <div className={'spice-console-' + status}>{status === DISCONNECTED ? textDisconnected : textConnecting}</div>
        )}
        {status}
        {spiceStaticComponent}
      </div>
    </div>
  );
};
SpiceConsole.displayName = 'SpiceConsole';
