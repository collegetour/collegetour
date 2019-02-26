import Tourist from '../../models/tourist'

const route = async (req, res, trx) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch({
    transacting: trx
  })

  await tourist.destroy({ transacting: trx })

  res.status(200).json({
    data: true
  })

}

export default route
