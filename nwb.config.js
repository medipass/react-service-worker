module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Workice',
      externals: {
        react: 'React'
      }
    }
  }
}
