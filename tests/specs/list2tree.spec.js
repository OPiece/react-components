import list2tree from 'lib/list2tree'

const list = [{
  id: 1,
  parentId: 0,
  value: 1
}, {
  id: 2,
  parentId: 0,
  value: 2
}, {
  id: 3,
  parentId: 1,
  value: 3
}, {
  id: 4,
  parentId: 2,
  value: 4
}, {
  id: 5,
  parentId: 3,
  value: 5
}]
const result = list2tree(list)
const oneChild = result.find(item => item.id === 1)
const otherChild = result.find(item => item.id === 2)

describe('list2tree function', () => {
  it('error params', () => {
    expect(list2tree()).to.be.an('array')
    expect(list2tree()).to.be.empty
    expect(list2tree({})).to.be.empty
    expect(list2tree(null)).to.be.empty
  })

  // describe('Whether the result is correct or not', () => {
  //   beforeEach(() => {
  //     const oneChild = result.find(item => item.id === 1)
  //     const otherChild = result.find(item => item.id === 2)
  //   })
  // })

  it('Whether the result\'s length is correct or not', () => {
    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(2)

    expect(oneChild).to.be.an('object')
    expect(oneChild.children).to.be.an('array')
    expect(oneChild.children).to.have.lengthOf(1)
    expect(oneChild.children[0].children).to.be.an('array')
    expect(oneChild.children[0].children).to.have.lengthOf(1)

    expect(otherChild).to.be.an('object')
    expect(otherChild.children).to.be.an('array')
    expect(otherChild.children).to.have.lengthOf(1)
    expect(otherChild.children[0].children).to.equal(undefined)
  })

  it('Whether the result\'s content is correct or not', () => {
    expect(oneChild).to.be.an('object')
    expect(oneChild).to.have.all.keys('id', 'parentId', 'value', 'children')
    expect(oneChild.children[0]).to.have.all.keys('id', 'parentId', 'value', 'children')
    expect(oneChild.children[0].children[0]).to.have.all.keys('id', 'parentId', 'value')

    expect(otherChild).to.be.an('object')
    expect(otherChild).to.have.all.keys('id', 'parentId', 'value', 'children')
    expect(otherChild.children[0]).to.have.all.keys('id', 'parentId', 'value')
  })
})
