import Mocha from 'mocha'
import glob from 'glob'

const test = async () => {

  const mocha = new Mocha()

  glob.sync('src/@(app|server)/**/*_test.js').map((test) => {

    mocha.addFile(test)

  })

  await new Promise((resolve, reject) => {

    mocha.run((err) => {

      if(err) reject(err)

      resolve()

    })

  })

}

test().then(process.exit)
