import { uploadChunk } from '../../services/assets'

const route = async (req, res, trx) => {

  const data = await uploadChunk(req, trx)

  res.status(200).json({ data })

}

export default route
