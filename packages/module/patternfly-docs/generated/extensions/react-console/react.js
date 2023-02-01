import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import { AccessConsoles, SerialConsole, VncConsole, DesktopViewer } from '@patternfly/react-console';
import { SerialConsoleCustom } from '../../../content/extensions/react-console/examples/./SerialConsoleCustom.jsx';
import { debounce } from '@patternfly/react-core';
import '@patternfly/react-console/dist/css/AccessConsoles.css';
import '@patternfly/react-console/dist/css/DesktopViewer.css';
import '@patternfly/react-console/dist/css/SerialConsole.css';
import '@patternfly/react-console/dist/css/VncConsole.css';
import '@patternfly/react-console/dist/css/xterm.css';
const pageData = {
  "id": "React console",
  "section": "extensions",
  "subsection": "",
  "source": "react",
  "slug": "/extensions/react-console/react",
  "sourceLink": "https://github.com/patternfly/react-console",
  "propComponents": [
    {
      "name": "AccessConsoles",
      "description": "",
      "props": [
        {
          "name": "preselectedType",
          "type": "No type info",
          "defaultValue": "null"
        },
        {
          "name": "textDesktopViewerConsole",
          "type": "No type info",
          "defaultValue": "'Desktop viewer'"
        },
        {
          "name": "textSelectConsoleType",
          "type": "No type info",
          "defaultValue": "'Select console type'"
        },
        {
          "name": "textSerialConsole",
          "type": "No type info",
          "defaultValue": "'Serial console'"
        },
        {
          "name": "textVncConsole",
          "type": "No type info",
          "defaultValue": "'VNC console'"
        }
      ]
    },
    {
      "name": "SerialConsole",
      "description": "",
      "props": [
        {
          "name": "cols",
          "type": "number",
          "description": "The number of columns to resize to"
        },
        {
          "name": "fontFamily",
          "type": "string",
          "description": ""
        },
        {
          "name": "fontSize",
          "type": "number",
          "description": ""
        },
        {
          "name": "innerRef",
          "type": "React.RefObject<any>",
          "description": "A reference object to attach to the SerialConsole."
        },
        {
          "name": "onConnect",
          "type": "() => void",
          "description": "Initiate connection to backend. In other words, the calling components manages connection state.",
          "required": true
        },
        {
          "name": "onData",
          "type": "(e: string) => void",
          "description": "Terminal produced data, like key-press",
          "required": true
        },
        {
          "name": "onDisconnect",
          "type": "() => void",
          "description": "Close connection to backend",
          "required": true
        },
        {
          "name": "onTitleChanged",
          "type": "() => void",
          "description": "Terminal title has been changed"
        },
        {
          "name": "rows",
          "type": "number",
          "description": "The number of rows to resize to"
        },
        {
          "name": "status",
          "type": "string",
          "description": ""
        },
        {
          "name": "textConnect",
          "type": "string",
          "description": "Text content rendered inside the Connect button"
        },
        {
          "name": "textDisconnect",
          "type": "string",
          "description": "Text content rendered inside the Disconnect button"
        },
        {
          "name": "textDisconnected",
          "type": "string",
          "description": ""
        },
        {
          "name": "textLoading",
          "type": "string",
          "description": ""
        },
        {
          "name": "textReset",
          "type": "string",
          "description": "Text content rendered inside the Reset button"
        }
      ]
    },
    {
      "name": "VncConsole",
      "description": "",
      "props": [
        {
          "name": "additionalButtons",
          "type": "No type info",
          "defaultValue": "[]"
        },
        {
          "name": "clipViewport",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "dragViewport",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "encrypt",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "onDisconnected",
          "type": "No type info",
          "defaultValue": "() => {}"
        },
        {
          "name": "path",
          "type": "No type info",
          "defaultValue": "''"
        },
        {
          "name": "port",
          "type": "No type info",
          "defaultValue": "'80'"
        },
        {
          "name": "repeaterID",
          "type": "No type info",
          "defaultValue": "''"
        },
        {
          "name": "resizeSession",
          "type": "No type info",
          "defaultValue": "true"
        },
        {
          "name": "scaleViewport",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "shared",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "textConnect",
          "type": "No type info",
          "defaultValue": "'Connect'"
        },
        {
          "name": "textConnecting",
          "type": "No type info",
          "defaultValue": "'Connecting'"
        },
        {
          "name": "textDisconnect",
          "type": "No type info",
          "defaultValue": "'Disconnect'"
        },
        {
          "name": "textDisconnected",
          "type": "No type info",
          "defaultValue": "'Click Connect to open the VNC console.'"
        },
        {
          "name": "viewOnly",
          "type": "No type info",
          "defaultValue": "false"
        },
        {
          "name": "vncLogging",
          "type": "No type info",
          "defaultValue": "'warn'"
        }
      ]
    },
    {
      "name": "DesktopViewer",
      "description": "",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "description": "Custom content of more-info section",
          "defaultValue": "null"
        },
        {
          "name": "rdp",
          "type": "ConsoleDetailPropType",
          "description": "Connection details for RDP",
          "defaultValue": "null"
        },
        {
          "name": "spice",
          "type": "ConsoleDetailPropType",
          "description": "Connection details for Spice",
          "defaultValue": "null"
        },
        {
          "name": "textAddress",
          "type": "string",
          "description": ""
        },
        {
          "name": "textConnectWith",
          "type": "string",
          "description": ""
        },
        {
          "name": "textConnectWithRDP",
          "type": "string",
          "description": ""
        },
        {
          "name": "textConnectWithRemoteViewer",
          "type": "string",
          "description": ""
        },
        {
          "name": "textManualConnection",
          "type": "string",
          "description": ""
        },
        {
          "name": "textMoreInfo",
          "type": "string",
          "description": "Text that appears in the toggle"
        },
        {
          "name": "textMoreInfoContent",
          "type": "string | React.ReactNode",
          "description": "The information content appearing above the description list for guidelines to install virt-viewer"
        },
        {
          "name": "textMoreRDPInfo",
          "type": "string",
          "description": "Text that appears in the toggle"
        },
        {
          "name": "textMoreRDPInfoContent",
          "type": "string | React.ReactNode",
          "description": "The information content appearing above the description list for guidelines to install virt-viewer"
        },
        {
          "name": "textNoProtocol",
          "type": "string",
          "description": ""
        },
        {
          "name": "textRdpAddress",
          "type": "string",
          "description": ""
        },
        {
          "name": "textRDPPort",
          "type": "string",
          "description": ""
        },
        {
          "name": "textSpiceAddress",
          "type": "string",
          "description": ""
        },
        {
          "name": "textSpicePort",
          "type": "string",
          "description": ""
        },
        {
          "name": "textSpiceTlsPort",
          "type": "string",
          "description": ""
        },
        {
          "name": "textVNCAddress",
          "type": "string",
          "description": ""
        },
        {
          "name": "textVNCPort",
          "type": "string",
          "description": ""
        },
        {
          "name": "textVNCTlsPort",
          "type": "string",
          "description": ""
        },
        {
          "name": "vnc",
          "type": "ConsoleDetailPropType",
          "description": "Connection details for VNC",
          "defaultValue": "null"
        }
      ]
    }
  ],
  "beta": true,
  "examples": [
    "Basic Usage"
  ]
};
pageData.liveContext = {
  AccessConsoles,
  SerialConsole,
  VncConsole,
  DesktopViewer,
  SerialConsoleCustom,
  debounce
};
pageData.relativeImports = {
  
};
pageData.examples = {
  'Basic Usage': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { AccessConsoles, SerialConsole, VncConsole, DesktopViewer } from '@patternfly/react-console';\nimport { SerialConsoleCustom } from './SerialConsoleCustom.jsx';\nimport { debounce } from '@patternfly/react-core';\n\nAccessConsolesVariants = () => {\n  const [status, setStatus] = React.useState('disconnected');\n  const setConnected = React.useRef(debounce(() => setStatus('connected'), 3000)).current;\n  const onConnect = React.useCallback(() => {\n    setStatus('loading');\n    setConnected();\n  }, [setConnected])\n  const onDisconnect = React.useCallback(() => setStatus('disconnected'), [])\n  const ref = React.createRef();\n\n  return (\n    <AccessConsoles preselectedType=\"SerialConsole\">\n      <VncConsole host=\"localhost\" port=\"9090\" encrypt shared />\n      <SerialConsole\n        onConnect={onConnect}\n        status={status}\n        onDisconnect={onDisconnect}\n        onData={data => {\n          ref.current.onDataReceived(data);\n        }}\n        ref={ref}\n      />\n      <SerialConsoleCustom type='Serial Console pty2' />\n      <DesktopViewer spice={{ address: '127.0.0.1', port: '5900' }} vnc={{ address: '127.0.0.1', port: '5901' }} />\n    </AccessConsoles>\n  );\n};","title":"Basic Usage","lang":"js"}}>
      
    </Example>
};

const Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"id":"note","size":"h3","className":"ws-title ws-h3"}}>
      {`Note`}
    </AutoLinkHeader>
    <p {...{"className":"ws-p"}}>
      {`React console lives in its own package at `}
      <PatternflyThemeLink {...{"to":"https://www.npmjs.com/package/@patternfly/react-console"}}>
        <code {...{"className":"ws-code"}}>
          {`@patternfly/react-console`}
        </code>
      </PatternflyThemeLink>
    </p>
    <AutoLinkHeader {...{"id":"examples","size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    {React.createElement(pageData.examples["Basic Usage"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsReactConsoleReactDocs';
Component.pageData = pageData;

export default Component;
