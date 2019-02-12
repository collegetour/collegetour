import { DragSource, DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

class Visit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    visit: PropTypes.object,
    isDragging: PropTypes.bool,
    onReorder: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource, visit } = this.props
    return connectDropTarget(connectDragPreview(connectDragSource(
      <div className={ this._getClass() }>
        <div className="visit-token-handle">
          <i className="fa fa-circle" />
        </div>
        <div className="visit-token-logo">
          <img src={ visit.college.logo } />
        </div>
        <div className="visit-token-details">
          <strong>{ visit.college.name }</strong><br />
          <span className="visits-visit-details-location">
            { visit.college.city }, { visit.college.state }<br />
          </span>
        </div>
        <div className="visit-token-remove" onClick={ this._handleRemove }>
          <i className="fa fa-times" />
        </div>
      </div>
    )))
  }

  _getClass() {
    const { isDragging } = this.props
    const classes = ['visit-token']
    if(isDragging) classes.push('dragging')
    return classes.join(' ')
  }

  _handleRemove() {
    this.props.onRemove()
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    delta: props.visit.delta,
    onReorder: props.onReorder
  }),
  endDrag: (props, monitor, component) => {
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    if(!target) return
    source.onReorder(source.delta, target.index)
  }
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onReorder(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  },
  drop: (props, monitor, component) => ({
    index: props.index,
    delta: props.visit.delta
  })
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Visit = DragSource('ITEM', source, sourceCollector)(Visit)
Visit = DropTarget('ITEM', target, targetCollector)(Visit)

export default Visit
