import { checkUploadedFile } from '../../services/assets'

const route = async (req, res, trx) => {

  const exists = await checkUploadedFile(req, trx)

  if(!exists) return res.status(204).send('not found')

  res.status(200).send('found')

}

export default route
