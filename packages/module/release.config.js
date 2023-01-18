
module.exports = {
  branches: [{ name: 'main', channel: 'prerelease' }, { name: 'fix-release-attempt-2', channel: 'test' }],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm'
  ],
  tagFormat: 'v${version}',
  dryRun: true
};