/* global describe, it */
const assert = require('assert')
const Task = require('../Task')

describe('Task', () => {
  describe('.inspect()', () => {
    it('should provide an identity string with the correct signature', () => {
      const task = Task((x) => x + 1)
      // console.log(task)
      assert.deepStrictEqual(task.inspect(), 'Task((x) => x + 1)')
    })
  })
  /* describe('.emit()', () => {
    it('should create a new Task monad which has the correct internal value', () => {

    })
  })
  describe('.of()', () => {
    it('should create a new Task monad which has the correct internal value', () => {

    })
  }) */
})
