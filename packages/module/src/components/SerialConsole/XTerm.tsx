import React, { useImperativeHandle } from 'react';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { debounce, canUseDOM } from '@patternfly/react-core';

export interface XTermProps {
  /** The number of columns to resize to */
  cols?: number;
  /** The number of rows to resize to */
  rows?: number;
  fontFamily?: string;
  fontSize?: number;
  /** Terminal title has been changed. */
  onTitleChanged?: (title: string) => void;
  /** Data to be sent from terminal to backend; (data) => {} */
  onData?: (e: string) => void;
  /** A reference object to attach to the xterm */
  innerRef?: React.RefObject<any>;
}

export const XTerm: React.FunctionComponent<XTermProps> = ({
  cols = 80,
  rows = 25,
  fontFamily,
  fontSize,
  onTitleChanged,
  onData,
  innerRef
}) => {
  const terminalRef = React.useRef<Terminal>();
  const ref = React.useRef<HTMLDivElement>();

  useImperativeHandle(innerRef, () => ({
    focusTerminal() {
      if (terminalRef.current) {
        terminalRef.current.focus();
      }
    },
    /**
     * Backend sent data.
     *
     * @param {string} data String content to be writen into the terminal
     */
    onDataReceived: (data: string) => {
      if (terminalRef.current) {
        terminalRef.current.write(data);
      }
    },
    /**
     * Backend closed connection.
     *
     * @param {string} reason String error to be written into the terminal
     */
    onConnectionClosed: (reason: string) => {
      if (terminalRef.current) {
        terminalRef.current.write(`\x1b[31m${reason || 'disconnected'}\x1b[m\r\n`);
        terminalRef.current.refresh(terminalRef.current.rows, terminalRef.current.rows); // start to end row
      }
    }
  }));

  const onBeforeUnload = React.useCallback((event: any) => {
    // Firefox requires this when the page is in an iframe
    event.preventDefault();

    // see "an almost cross-browser solution" at
    // https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
    event.returnValue = '';
    return '';
  }, []);

  const onFocusIn = () => {
    window.addEventListener('beforeunload', onBeforeUnload);
  };

  const onFocusOut = React.useCallback(() => {
    window.removeEventListener('beforeunload', onBeforeUnload);
  }, [onBeforeUnload]);

  React.useEffect(() => {
    const fitAddon = new FitAddon();
    terminalRef.current = new Terminal({
      cols,
      rows,
      cursorBlink: true,
      fontFamily,
      fontSize,
      screenReaderMode: true
    });

    const onWindowResize = () => {
      const geometry = fitAddon.proposeDimensions();
      if (geometry) {
        terminalRef.current.resize(geometry.rows, geometry.cols);
      }
    };

    if (onData) {
      terminalRef.current.onData(onData);
    }

    if (onTitleChanged) {
      terminalRef.current.onTitleChange(onTitleChanged);
    }

    terminalRef.current.loadAddon(fitAddon);

    terminalRef.current.open(ref.current);

    const resizeListener = debounce(onWindowResize, 100);

    if (!rows) {
      if (canUseDOM) {
        window.addEventListener('resize', resizeListener);
      }
      onWindowResize();
    }
    terminalRef.current.focus();

    return () => {
      terminalRef.current.dispose();
      if (canUseDOM) {
        window.removeEventListener('resize', resizeListener);
      }
      onFocusOut();
    };
  }, [cols, fontFamily, fontSize, onData, onFocusOut, onTitleChanged, rows]);

  // ensure react never reuses this div by keying it with the terminal widget
  // Workaround for xtermjs/xterm.js#3172
  return <div ref={ref} role="list" onFocus={onFocusIn} onBlur={onFocusOut} />;
};
XTerm.displayName = 'XTerm';
