import Impression from '../../models/impression'

const route = async (req, res) => {

  const impression = await Impression.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  await impression.destroy({
    transacting: req.trx
  })

  res.status(200).json({
    data: null
  })

}

export default route
