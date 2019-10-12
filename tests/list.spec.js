/* global describe, it */
const assert = require('assert')
const List = require('../List')

describe('List', () => {
  describe('.of()', () => {
    it('should create a new monad which has the correct value', () => {
      const list = List.of([1, 2, 3])
      assert.deepStrictEqual(list.emit(), [1, 2, 3])
    })
    it('should throw the correct error when the value pass to .of() is not of type Array', () => {
      assert.throws(() => List.of('not an array'), new Error('The value passed to .of() must be of the type Array'))
    })
  })
  describe('.emit()', () => {
    it('should emit the correct value once the monad has been created', () => {
      const list = List.of([1, 2, 3])
      assert.deepStrictEqual(list.emit(), [1, 2, 3])
    })
  })
  describe('.chain()', () => {
    it('should return the held value as a function of the argument passed', () => {
      const list = List.of([1, 2, 3])
      const mappedArray = list.chain(x => x.map(i => i + 1))
      assert.deepStrictEqual(mappedArray, [2, 3, 4])
    })
  })
  describe('.map()', () => {
    it('should return a new monad of the correct type whos value is a function of the argument passed', () => {
      const list = List.of([1, 2, 3])
      const listValuesSquared = list.map(l => l.map(x => x * x))
      assert.deepStrictEqual(listValuesSquared.emit(), [1, 4, 9])
      assert.deepStrictEqual(listValuesSquared.inspect(), 'List([1,4,9])')
    })
  })
  describe('.inspect()', () => {
    it('should return a string showing the type of the monad and its internal value', () => {
      const list = List.of([1, 2, 3])
      assert.deepStrictEqual(list.inspect(), 'List([1,2,3])')
    })
  })
  describe('.concat()', () => {
    it('should return a monad of the List type whos value is a concatenated array', () => {
      const list = List.of([1, 2, 3])
      const newList = list.concat([4, 5, 6])
      assert.deepStrictEqual(newList.emit(), [1, 2, 3, 4, 5, 6])
      assert.strictEqual(newList.inspect(), 'List([1,2,3,4,5,6])')
    })
  })
  describe('.head()', () => {
    it('should return the value at the head of List internal array value', () => {
      const list = List.of([1, 2, 3])
      assert.strictEqual(list.head(), 1)
    })
    it('should return \'undefined\' if no head value is present in the List\'s internal array', () => {
      const list = List.of([])
      assert.strictEqual(list.head(), undefined)
    })
  })
  describe('.peak()', () => {
    it('should return the last value in the monads internal array value', () => {
      const list = List.of([1, 2, 3])
      assert.strictEqual(list.peak(), 3)
    })
    it('should return \'undefined\' if the internal array value of the monad is empty', () => {
      const list = List.of([])
      assert.strictEqual(list.peak(), undefined)
    })
  })
  describe('.min()', () => {
    it('should return the minimum value contained in the internal array value of the monad', () => {
      const list = List.of([3, 1, 2])
      assert.strictEqual(list.min(), 1)
    })
    it('should return \'undefined\' when the internal value of the monad is empty', () => {
      const list = List.of([])
      assert.strictEqual(list.min(), undefined)
    })
  })
  describe('.max()', () => {
    it('should return the maximum value contained in the internal array value of the monad', () => {
      const list = List.of([2, 3, 1])
      assert.strictEqual(list.max(), 3)
    })
    it('should return \'undefined\' when the internal value of the monad is empty', () => {
      const list = List.of([])
      assert.strictEqual(list.max(), undefined)
    })
  })
})
