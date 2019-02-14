import { CSSTransition } from 'react-transition-group'
import ModalPanel from '../modal_panel'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Preview from '../preview'
import React from 'react'

class Camera extends React.Component {

  static propTypes = {
    caption: PropTypes.string,
    preview: PropTypes.bool,
    upload: PropTypes.object,
    onAddUpload: PropTypes.func,
    onRemoveUpload: PropTypes.func,
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
  _handleType = this._handleType.bind(this)

  render() {
    const { preview, upload } = this.props
    return (
      <div className="camera">
        <input type="file" ref={ node => this.input = node } capture />
        <i className="fa fa-camera-retro" ref={ node => this.button = node } />
        <CSSTransition in={ preview } classNames="slide" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true } appear={ true }>
          <ModalPanel { ...this._getModalPanel() }>
            <div className="media">
              <div className="media-image">
                <Preview image={ upload } />
              </div>
              <div className="media-caption">
                <textarea { ...this._getCaption() } ref={ node => this.caption = node } />
              </div>
            </div>
          </ModalPanel>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    this.resumable = new Resumable({
      target: '/api/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {},
      maxFiles: 1,
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.button.addEventListener('click', this._handleClick, false)
    this.resumable.assignBrowse(this.input)
    this.input.setAttribute('accept', 'image/*')
  }

  _getCaption(e) {
    const { caption } = this.props
    return {
      placeholder: 'Type a caption',
      onChange: this._handleType,
      value: caption
    }
  }

  _getModalPanel() {
    return {
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Share', handler: this._handleSave }
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
    this.props.onRemoveUpload()
  }

  _handleSave() {
    const { caption, upload } = this.props
    this.props.onSave(1, 1, upload.asset.id, caption)
  }

  _handleSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateUpload(asset)
  }

  _handleType(e) {
    this.props.onType(e.target.value)
  }

  _handleFinish() {
    console.log('finish')
  }

  _handleClick() {
    this.input.style.display = 'block'
    this.input.focus()
    this.input.click()
    this.input.style.display = 'none'
  }
}

export default Camera
