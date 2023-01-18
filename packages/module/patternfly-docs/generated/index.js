module.exports = {
  '/extensions/access-consoles/react': {
    id: "Access consoles",
    title: "Access consoles",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    examples: ["Basic Usage"],
    section: "extensions",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/access-consoles/react/index" */ './extensions/access-consoles/react')
  },
  '/consoles/desktopviewer/react': {
    id: "DesktopViewer",
    title: "DesktopViewer",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    examples: ["Basic Usage"],
    section: "consoles",
    source: "react",
    Component: () => import(/* webpackChunkName: "consoles/desktopviewer/react/index" */ './consoles/desktopviewer/react')
  }
};