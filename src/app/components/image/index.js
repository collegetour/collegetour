import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    transforms: PropTypes.object,
    onClick: PropTypes.func,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    onLoad: () => {}
  }

  state = {
    loaded: false
  }

  _handleLoad = this._handleLoad.bind(this)

  render() {
    const { src } = this.props
    if(!src) return <div className="image" />
    return (
      <div className="image">
        <img { ...this._getImage() } />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaded } = this.state
    if(loaded !== prevState.loaded) {
      this.props.onLoad()
    }
  }

  _getImage() {
    const { alt, className, title } = this.props
    const normal = `${this._getHost()}${this._getNormal()}`
    const retina = `${this._getHost()}${this._getRetina()}`
    return {
      alt,
      className,
      src: normal,
      srcSet: `${normal} 1x, ${retina} 2x`,
      title,
      onLoad: this._handleLoad
    }
  }

  _getHost() {
    return ''
    // return '' || process.env.CDN_HOST || process.env.ASSET_HOST
  }

  _getNormal() {
    const { src, transforms } = this.props
    if(!transforms) return src
    const query = qs.stringify(transforms, { encode: false })
    return `/imagecache/${query}&dpi=2${src}`
  }

  _getRetina() {
    const { src, transforms } = this.props
    if(!transforms) return src
    const query = qs.stringify(transforms, { encode: false })
    return `/imagecache/${query}&dpi=2${src}`
  }

  _handleLoad() {
    this.setState({
      loaded: true
    })
  }

}

export default Image
