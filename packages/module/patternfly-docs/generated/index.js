module.exports = {
  '/extensions/react-console/design-guidelines': {
    id: "react-console",
    title: "react-console",
    toc: [{"text":"Header"},[{"text":"Sub-header"}]],
    section: "extensions",
    source: "design-guidelines",
    Component: () => import(/* webpackChunkName: "extensions/react-console/design-guidelines/index" */ './extensions/react-console/design-guidelines')
  },
  '/extensions/react-console/react': {
    id: "react-console",
    title: "react-console",
    toc: [{"text":"Basic usage"},[{"text":"Example"},{"text":"Fullscreen example"}]],
    examples: ["Example"],
    fullscreenExamples: ["Fullscreen example"],
    section: "extensions",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/react-console/react/index" */ './extensions/react-console/react')
  }
};