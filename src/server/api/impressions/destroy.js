import Impression from '../../models/impression'

const route = async (req, res, trx) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  await impression.destroy({
    transacting: trx
  })

  res.status(200).json({
    data: null
  })

}

export default route
