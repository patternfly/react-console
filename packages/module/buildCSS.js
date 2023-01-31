const fs = require('fs');
const path = require('path')

const consoleStylesPath = require.resolve('@patternfly/react-styles').replace('dist', 'css').replace('js', 'components').replace('index.js', 'Consoles')

const files = fs.readdirSync(consoleStylesPath)

const consoleCSSFiles = files.filter(fileName => fileName.match(/\.css$/))

const outputDirPath = path.resolve('./dist/css')

if (!fs.existsSync(outputDirPath)) {
  fs.mkdirSync(outputDirPath)
}

consoleCSSFiles.forEach(fileName => {
  const src = path.join(consoleStylesPath, fileName)
  const dest = path.join(outputDirPath, fileName)
  fs.copyFileSync(src, dest)
})
