const college_serializer = (college) => ({
  id: college.get('id'),
  name: college.get('name'),
  city: college.get('city'),
  state: college.get('state'),
  phone: college.get('phone'),
  website: college.get('website'),
  logo: college.related('logo').get('url'),
  created_at: college.get('created_at'),
  updated_at: college.get('updated_at')
})

export default college_serializer
