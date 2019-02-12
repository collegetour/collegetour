import  { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

class Home extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div>
        <Helmet>
          <title>Home | Static Starter</title>
        </Helmet>
        Hello World!<br />
        <ul>
          <li><Link to='/page1'>Page1</Link></li>
          <li><Link to='/page2'>Page2</Link></li>
        </ul>
      </div>
    )
  }

}

export default Home
