import Tourists from '../../components/tourists'
import { Page } from '../../components/page'

const mapResourcesToPage = (props, context, page) => ({
  tourists: `${process.env.API_HOST}/api/tours/${page.params.tour_id}/tourists`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Tourists',
  component: Tourists
})

export default Page(mapResourcesToPage, mapPropsToPage)
