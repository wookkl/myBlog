module.exports = {
  apps: [{
  name: 'my_blog',
  script: '/app/node_modules/.bin/ts-node',
  args: '/app/src/index.ts',
  instances: 1,
  watch: false,
  exec_mode: "cluster"
  }]
}