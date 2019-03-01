import Tourist from '../../models/tourist'

const route = async (req, res) => {

  const tourist = await Tourist.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  await tourist.destroy({ transacting: req.trx })

  res.status(200).json({
    data: true
  })

}

export default route
