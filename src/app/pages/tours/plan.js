import { Page } from '../../components/page'
import Plan from '../../components/plan'
import React from 'react'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Plan Your Tour',
  component: () => <Plan tour_id={ page.params.tour_id } />
})

export default Page(null, mapPropsToPage)
