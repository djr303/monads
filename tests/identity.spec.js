/* global describe, it */
const assert = require('assert')
const Identity = require('../Identity')

describe('Identity', () => {
  describe('.of()', () => {
    it('should create a new monad which has the correct value', () => {
      const one = Identity.of(1)
      assert.strictEqual(one.emit(), 1)
    })
  })
  describe('.emit()', () => {
    it('should emit the correct value once the monad has been created', () => {
      const two = Identity.of(2)
      assert.strictEqual(two.emit(), 2)
    })
  })
  describe('.chain()', () => {
    it('should return the held value as a function of the argument passed', () => {
      const three = Identity.of(3)
      const threeSquared = three.chain(x => x * x)
      assert.strictEqual(threeSquared, 9)
    })
  })
  describe('.map()', () => {
    it('should return a new monad of the correct type and whos value is a function of the argument passed', () => {
      const three = Identity.of(3)
      const threeSquared = three.map(x => x * x)
      assert.strictEqual(threeSquared.emit(), 9)
      assert.strictEqual(threeSquared.inspect(), 'Identity(9)')
    })
  })
  describe('.inspect()', () => {
    it('should return a string showing the type of the monad and its internal value', () => {
      const two = Identity.of(2)
      assert.strictEqual(two.inspect(), 'Identity(2)')
    })
  })
})
