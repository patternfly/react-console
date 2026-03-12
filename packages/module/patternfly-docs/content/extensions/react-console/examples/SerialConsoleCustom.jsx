import React, { useState, useRef, createRef, useCallback } from 'react';
import { debounce } from '@patternfly/react-core';
import { SerialConsole } from '@patternfly/react-console';

export const SerialConsoleCustom = () => {
  const [status, setStatus] = useState('disconnected');
  const setConnected = useRef(debounce(() => setStatus('connected'), 3000)).current;
  const ref2 = createRef();

  const onConnect = useCallback(() => {
    setStatus('loading');
    setConnected();
  }, [setConnected]);

  const onDisconnect = useCallback(() => {
    setStatus('disconnected');
  }, []);

  const onData = useCallback((data) => {
    ref2.current?.onDataReceived?.(data);
  }, []);

  return (
    <SerialConsole
      onConnect={onConnect}
      onDisconnect={onDisconnect}
      onData={onData}
      status={status}
      ref={ref2}
    />
  );
};
