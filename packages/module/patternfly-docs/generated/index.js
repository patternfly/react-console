module.exports = {
  '/extensions/react-console/react': {
    id: "React console",
    title: "React console",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    fullscreenExamples: ["Basic Usage"],
    section: "extensions",
    subsection: "",
    source: "react",
    tabName: null,
    beta: true,
    Component: () => import(/* webpackChunkName: "extensions/react-console/react/index" */ './extensions/react-console/react')
  }
};