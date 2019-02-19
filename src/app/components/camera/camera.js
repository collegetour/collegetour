import ModalPanel from '../modal_panel'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Preview from '../preview'
import React from 'react'

class Camera extends React.Component {

  static propTypes = {
    caption: PropTypes.string,
    tour_id: PropTypes.string,
    uploads: PropTypes.array,
    visit_id: PropTypes.string,
    onAddUpload: PropTypes.func,
    onRemoveUploads: PropTypes.func,
    onSave: PropTypes.func,
    onType: PropTypes.func,
    onUpdateUpload: PropTypes.func
  }

  static defaultProps = {
  }

  button = null
  caption = null
  files = {}
  input = null
  resumable = null

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleFinish = this._handleFinish.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { uploads } = this.props
    return (
      <div className="camera">
        <input type="file" ref={ node => this.input = node } />
        <i className="fa fa-camera-retro" ref={ node => this.button = node } />
        { uploads.length > 0 &&
          <ModalPanel { ...this._getModalPanel() }>
            <div className="media list">
              { uploads.map((upload, index) => (
                <div className="list-item" key={`media_${index}`}>
                  <div className="media-post">
                    <div className="media-image">
                      <div className="media-frame">
                        <Preview image={ upload } />
                      </div>
                    </div>
                    <div className="media-caption">
                      <textarea { ...this._getCaption(index) } />
                    </div>
                  </div>
                </div>
              )) }
              <div className="media-canvas" />
            </div>
          </ModalPanel>
        }
      </div>
    )
  }

  componentDidMount() {
    this.resumable = new Resumable({
      target: `${process.env.API_HOST}/api/assets/upload`,
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.button.addEventListener('click', this._handleClick, false)
    this.resumable.assignBrowse(this.input)
    this.input.setAttribute('accept', 'image/*')
  }

  _getCaption(index) {
    const { caption } = this.props
    return {
      placeholder: 'Describe your impressions',
      onChange: this._handleType.bind(this, index),
      value: caption
    }
  }

  _getModalPanel() {
    return {
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Post', handler: this._handleSave }
      ]
    }
  }

  _handleAdd(file) {
    this.props.onAddUpload({
      content_type: file.file.type,
      file: file.file,
      identifier: file.uniqueIdentifier,
      source: 'device'
    })
    this.resumable.upload()
  }

  _handleCancel() {
    this.props.onRemoveUploads()
  }

  _handleSave() {
    const { caption, tour_id, uploads, visit_id } = this.props
    const impressions = uploads.map(upload => ({
      asset_id: upload.asset.id,
      caption: upload.caption
    }))
    this.props.onSave(tour_id, visit_id, impressions)
  }

  _handleSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateUpload(asset)
  }

  _handleType(index, e) {
    this.props.onType(index, e.target.value)
  }

  _handleFinish() {}

  _handleClick() {
    this.input.style.display = 'block'
    this.input.focus()
    this.input.click()
    this.input.style.display = 'none'
  }
}

export default Camera
