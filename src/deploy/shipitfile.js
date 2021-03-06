import path from 'path'
import utils from 'shipit-utils'

const shipitfile = (shipit) => {

  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/var/www/collegetouristapp',
      repositoryUrl: 'https://github.com/collegetourist/collegetouristapp.git',
      key: `~/.ssh/id_rsa_${process.env.FINGERPRINT}`,
      workspace: path.resolve('repo'),
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      strict: 'no'
    },
    production: {
      servers: 'root@app1.collegetouristapp.com'
    }
  })

  const deployDir = shipit.config.deployTo

  const sharedDir = deployDir + '/shared'

  const currentDir = deployDir + '/current'

  utils.registerTask(shipit, 'deploy:prepare', [
    'deploy:install_modules',
    'deploy:build',
    'deploy:tmp'
  ])

  utils.registerTask(shipit, 'deploy:release', [
    'deploy:reload_appserver',
    'deploy:cache_app',
    'deploy:invalidate'
  ])

  utils.registerTask(shipit, 'deploy:config', () => {
    const mkdir = () => shipit.remote('mkdir -p ' + sharedDir)
    const linkConfig = () => shipit.remote('ln -s ' + sharedDir + '/.env ' + shipit.releasePath + '/.env')
    return mkdir().then(linkConfig)
  })

  utils.registerTask(shipit, 'deploy:install_modules', () => {
    return shipit.remote('cd ' + shipit.releasePath + ' && npm install')
  })

  utils.registerTask(shipit, 'deploy:build', () => {
    return shipit.remote('cd ' + shipit.releasePath + ' && NODE_ENV=production npm run build && chown -R 501.games dist')
  })

  utils.registerTask(shipit, 'deploy:tmp', () => {
    return shipit.remote('cd ' + shipit.releasePath + ' && rm -rf tmp && ln -s ' + sharedDir + '/tmp ' + shipit.releasePath + '/tmp')
  })

  utils.registerTask(shipit, 'deploy:reload_appserver', () => {
    return shipit.remote('touch ' + currentDir + '/tmp/restart.txt')
  })

  utils.registerTask(shipit, 'deploy:cache_app', () => {
    return shipit.remote('wget -O - http://127.0.0.1:80/ping')
  })

  utils.registerTask(shipit, 'deploy:invalidate', () => {
    return shipit.remote('cd ' + currentDir + ' && NODE_ENV=production npm run invalidate')
  })

  shipit.on('updated', function () {
    return shipit.start('deploy:prepare')
  })

  shipit.on('deployed', function () {
    return shipit.start('deploy:release')
  })

}

export default shipitfile
