import { Page } from '../../components/page'
import Plan from '../../components/plan'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Plan Your Tour',
  component: Plan
})

export default Page(null, mapPropsToPage)
