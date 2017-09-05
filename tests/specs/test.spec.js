import { expect } from 'chai'
describe('A suite of basic functions', () => {
  it('reverse word', () => {
    expect('DCBA').equal('ABCD'.split('').reverse().join(''))
  })
})
