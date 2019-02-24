import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import _ from 'lodash'

class Uploader extends React.Component {

  static childContextTypes = {
    uploader: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    chunks: PropTypes.number,
    percent: PropTypes.number,
    progress: PropTypes.number,
    uploads: PropTypes.array,
    onAddUpload: PropTypes.func,
    onRemoveUpload: PropTypes.func,
    onSaveUpload: PropTypes.func,
    onUpdateProgress: PropTypes.func
  }

  state = {
    uploads: 0
  }

  resumable = null
  upload = null
  tour_id = null
  visit_id = null

  _handleAddUpload = this._handleAddUpload.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleUpdateProgress = this._handleUpdateProgress.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)

  render() {
    const { children, percent, uploads } = this.props
    return (
      <div className="uploader">
        { children }
        <div ref={ node => this.upload = node } />
        { this.state.uploads > 0 &&
          <div className="uploader-status">
            <div className="ui inverted segment">
              { uploads.length > 0 ?
                <div className="ui tiny green inverted progress">
                  <div className="bar" style={{ width: `${percent}%` }}></div>
                  <div className="label">
                    Uploading { pluralize('photo', uploads.length, true) } ({ percent }%)</div>
                </div> :
                <div className="uploader-complete">
                  <i className="fa fa-check" /> Uploads complete
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.resumable = new Resumable({
      target: '/api/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAddUpload)
    this.resumable.on('fileProgress', this._handleUpdateProgress)
    this.resumable.on('fileSuccess', this._handleUploadSuccess)
    this.resumable.assignBrowse(this.upload)
  }

  componentDidUpdate(prevProps) {
    if(this.props.uploads.length > prevProps.uploads.length) {
      const uploads = this.state.uploads + 1
      this.setState({ uploads })
    }
    if(this.props.uploads.length < prevProps.uploads.length) {
      setTimeout(() => {
        const uploads = this.state.uploads - 1
        this.setState({ uploads })
      }, 5000)
    }
  }

  getChildContext() {
    return {
      uploader: {
        browse: this._handleBrowse
      }
    }
  }

  _handleBrowse(tour_id, visit_id) {
    this.tour_id = tour_id
    this.visit_id = visit_id
    setTimeout(() => this.upload.click(), 250)
  }

  _handleAddUpload(upload) {
    this.props.onAddUpload(this.tour_id, this.visit_id, upload.uniqueIdentifier)
    this.resumable.upload()
  }

  _handleUpdateProgress(upload) {
    this.props.onUpdateProgress(this.resumable.progress())
  }

  _handleUploadSuccess(upload, data) {
    const { uploads } = this.props
    const result = JSON.parse(data)
    this.resumable.removeFile(upload)
    const { tour_id, visit_id } = _.find(uploads, { uniqueIdentifier: upload.uniqueIdentifier })
    this.props.onSaveUpload(upload.uniqueIdentifier, tour_id, visit_id, result.data.id)
  }

}

export default Uploader
