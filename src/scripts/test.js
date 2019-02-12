import Mocha from 'mocha'
import path from 'path'
import glob from 'glob'

const test = async () => {

  const mocha = new Mocha()

  glob.sync('src/tests/*_test.js').map((test) => {

    mocha.addFile(test)

  })

  await new Promise((resolve, reject) => {

    const runner = mocha.run((err) => {

      if(err) reject(err)

      resolve()

    })


  })

}

test().then(() => process.exit())
