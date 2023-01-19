module.exports = {
  '/extensions/react-console/react': {
    id: "React console",
    title: "React console",
    toc: [[{"text":"Note"}],{"text":"Examples"},[{"text":"Basic Usage"}]],
    examples: ["Basic Usage"],
    section: "extensions",
    subsection: "",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/react-console/react/index" */ './extensions/react-console/react')
  }
};