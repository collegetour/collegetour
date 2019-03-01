const route = async (req, res) => {

  res.status(200).json({
    data: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      photo: req.user.related('photo').get('url'),
      agreed_to_terms: req.user.get('agreed_to_terms')
    }
  })

}

export default route
