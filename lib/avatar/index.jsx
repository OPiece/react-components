import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './style.css'

export default class Avatar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    size: PropTypes.string
  }

  render () {
    const { className, children, size } = this.props
    let cls = 'avatar'
    if (className) {
      cls += (' ' + className)
    }
    if (/^(large|small)?$/.test(size)) {
      cls += (' ' + size)
    }

    return (
      <i className={cls}>
        { children }
      </i>
    )
  }
}
