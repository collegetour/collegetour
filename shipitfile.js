const path = require('path')
const utils = require('shipit-utils')

module.exports = shipit => {

  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/var/www/collegetouristapp',
      repositoryUrl: 'https://github.com/collegetour/collegetour.git',
      key: '~/.ssh/gkops',
      workspace: path.resolve('repo'),
      ignores: ['.git', 'node_modules'],
      keepReleases: 2
    },
    production: {
      servers: 'root@54.91.124.183'
    }
  })

  const deployDir = shipit.config.deployTo

  const sharedDir = deployDir + '/shared'

  const currentDir = deployDir + '/current'

  utils.registerTask(shipit, 'deploy:prepare', [
    'deploy:config',
    'deploy:install_modules'
  ])

  utils.registerTask(shipit, 'deploy:release', [
    'deploy:reload_appserver',
    'deploy:cache_app'
  ])

  utils.registerTask(shipit, 'deploy:config', () => {
    const mkdir = () => shipit.remote('mkdir -p ' + sharedDir)
    const copyConfig = () => shipit.remoteCopy(path.resolve('.env.'+shipit.options.environment), sharedDir + '/.env')
    const linkConfig = () => shipit.remote('rm -rf ' + shipit.releasePath + '/.env && ln -s ' + sharedDir + '/.env ' + shipit.releasePath + '/.env')
    return mkdir().then(copyConfig).then(linkConfig)
  })

  utils.registerTask(shipit, 'deploy:install_modules', () => {
    return shipit.remote('cd ' + shipit.releasePath + ' && npm install')
  })

  utils.registerTask(shipit, 'deploy:reload_appserver', () => {
    return shipit.remote('touch ' + currentDir + '/tmp/restart.txt')
  })

  utils.registerTask(shipit, 'deploy:cache_app', () => {
    return shipit.remote('wget -O - http://127.0.0.1:80/ping')
  })

  shipit.on('updated', function () {
    return shipit.start('deploy:prepare')
  })

  shipit.on('deployed', function () {
    return shipit.start('deploy:release')
  })
}
