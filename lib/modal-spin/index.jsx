import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Modal, Spin } from 'antd'
import './style.css'

export default class ModalSpin extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    tip: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.element
  }

  render () {
    const { visible, tip, size, children } = this.props
    return (
      <Modal
        title=""
        wrapClassName="vertical-center-modal"
        visible={visible}
        footer={null}
        closable={false}
      >
        { children || <Spin tip={tip || '加载中...'} size={size || 'large'} /> }
      </Modal>
    )
  }
}
