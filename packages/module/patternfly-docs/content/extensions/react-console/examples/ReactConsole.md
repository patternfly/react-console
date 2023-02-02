---
id: React console
section: extensions
source: react
propComponents: ['AccessConsoles', 'SerialConsole', 'VncConsole', 'DesktopViewer']
ouia: false
beta: true
sourceLink: https://github.com/patternfly/react-console
---

### Note
React console lives in its own package at [`@patternfly/react-console`](https://www.npmjs.com/package/@patternfly/react-console)

import { AccessConsoles, SerialConsole, VncConsole, DesktopViewer } from '@patternfly/react-console';
import { SerialConsoleCustom } from './SerialConsoleCustom.jsx';
import { debounce } from '@patternfly/react-core';

## Examples

### Basic Usage
```js
import React from 'react';
import { AccessConsoles, SerialConsole, VncConsole, DesktopViewer } from '@patternfly/react-console';
import { SerialConsoleCustom } from './SerialConsoleCustom.jsx';
import { debounce } from '@patternfly/react-core';

AccessConsolesVariants = () => {
  const [status, setStatus] = React.useState('disconnected');
  const setConnected = React.useRef(debounce(() => setStatus('connected'), 3000)).current;
  const onConnect = React.useCallback(() => {
    setStatus('loading');
    setConnected();
  }, [setConnected])
  const onDisconnect = React.useCallback(() => setStatus('disconnected'), [])
  const ref = React.createRef();

  return (
    <AccessConsoles preselectedType="SerialConsole">
      <VncConsole host="localhost" port="9090" encrypt shared />
      <SerialConsole
        onConnect={onConnect}
        status={status}
        onDisconnect={onDisconnect}
        onData={data => {
          ref.current.onDataReceived(data);
        }}
        ref={ref}
      />
      <SerialConsoleCustom type='Serial Console pty2' />
      <DesktopViewer spice={{ address: '127.0.0.1', port: '5900' }} vnc={{ address: '127.0.0.1', port: '5901' }} />
    </AccessConsoles>
  );
};
```

