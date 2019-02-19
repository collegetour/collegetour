import archiver from 'archiver'
import path from 'path'
import fs from 'fs'

const archive = async () => {

  console.log('Archiving code')

  const targetFile = path.join('tmp', 'lambda.zip')

  await new Promise((resolve, reject) => {

    const archive = archiver.create('zip', {})

    const zipStream = fs.createWriteStream(targetFile)

    zipStream.on('close', resolve)

    archive.pipe(zipStream)

    archive.directory(path.join('dist'), false)

    archive.on('error', reject)

    archive.finalize()

  })

}

export default archive
