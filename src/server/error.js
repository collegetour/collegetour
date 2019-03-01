const error = (err, req, res, next) => {

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

export default error
