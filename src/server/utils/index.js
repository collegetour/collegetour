export const t = (handler) => async (req, res, next) => {

  try {

    await handler(req, res, next)

  } catch(err) {

    if(err.errors) {

      return res.status(422).json({
        message: 'Unable to save record',
        errors: err.toJSON()
      })

    }

    res.status(500).json({
      message: err.message
    })

  }

}
