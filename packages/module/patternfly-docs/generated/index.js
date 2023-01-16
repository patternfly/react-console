module.exports = {
  '/extensions/access-consoles/extensions': {
    id: "Access consoles",
    title: "Access consoles",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    examples: ["Basic Usage"],
    section: "extensions",
    source: "extensions",
    Component: () => import(/* webpackChunkName: "extensions/access-consoles/extensions/index" */ './extensions/access-consoles/extensions')
  },
  '/consoles/desktopviewer/extensions': {
    id: "DesktopViewer",
    title: "DesktopViewer",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    examples: ["Basic Usage"],
    section: "consoles",
    source: "extensions",
    Component: () => import(/* webpackChunkName: "consoles/desktopviewer/extensions/index" */ './consoles/desktopviewer/extensions')
  }
};