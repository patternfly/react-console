# React Console

This package provides VncConsole, SerialConsole and DesktopViewer React components
to be used alongside patternfly-react to access virtual machine or server consoles.

### Installing

```
yarn add @patternfly/react-console
```

or

```
npm install @patternfly/react-console --save
```

### Usage

It's strongly advised to use the PatternFly Base CSS in your whole project, or some components may diverge in appearance:

```js
import '@patternfly/react-core/dist/styles/base.css';
```

```js
import { VncConsole, SerialConsole } from '@patternfly/react-console';
```

### Building

```
yarn build
```

Note the build scripts for this are located in the root package.json under `yarn build`.

### Testing

Testing is done at the root of this repo.

```
yarn test
```

### Publishing

```
yarn publish
```
