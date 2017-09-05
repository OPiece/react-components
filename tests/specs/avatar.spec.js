import React from 'react'
import { Avatar } from 'src/index'
import { shallow } from 'enzyme'

describe('(Layout) PageLayout', () => {
  it('renders as a <div>', () => {
    shallow(<Avatar />).should.have.tagName('div')
  })

  it('renders a project title', () => {
    shallow(<Avatar />).find('h1').should.have.text('React Redux Starter Kit')
  })

  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>
    shallow(
      <Avatar className="circle" size="small">
        <img src="static/images/wx@2x.png" />
      </Avatar>
    )
      .find('.page-layout__viewport')
      .should.contain(<Child />)
  })
})
