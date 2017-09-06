import React, { PureComponent } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'

import Form from '../form'
import { Table, Button } from 'antd'

import './style.css'

export default class Grid extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    operations: PropTypes.array,
    search: PropTypes.object
  }

  @autobind
  restFields () {
    this.refs.formSearch.formRef.props.form.resetFields()

    const { search } = this.props
    const { reset } = search || {}
    if (typeof reset === 'function') {
      reset()
    }
  }

  render () {
    const { className, operations, search, ...tableProps } = this.props
    let cls = 'component-grid'
    if (className) {
      cls += ' ' + className
    }

    const { items, formData, handleSubmit, reset } = search || {}
    if (search && items && items.length) {
      items.push({
        id: '__opeation',
        col: {
          labelCol: { span: 0 },
          wrapperCol: { span: 24 }
        },
        element: <div>
          <Button type="primary" htmlType="submit" style={{marginRight: 12}}>搜索</Button>
          {reset && <Button onClick={this.restFields}>重置</Button>}
        </div>
      })
    }

    return (
      <div className={cls}>
        <div className="grid-header clearfix">
          <div className="grid-operation">
            {
              // 操作按钮
              operations && operations.map((opera, index) =>
                <Button
                  key={index}
                  className="grid-operation-btn"
                  type={opera.type || 'primary'}
                  disabled={opera.disabled}
                  onClick={opera.handleClick}>
                  {opera.title}
                </Button>
              )
            }
          </div>
          {
            // 搜索框
            search && <Form
              ref="formSearch"
              className="grid-search"
              layout="inline"
              items={items}
              formData={formData}
              handleSubmit={handleSubmit} />
          }
        </div>

        <Table bordered {...tableProps} />
      </div>
    )
  }
}
