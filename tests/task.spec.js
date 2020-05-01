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
  describe('.emit()', () => {
    it('should return the held value', () => {
      const fork = (x) => x + 1
      const task = Task(fork)
      assert.deepStrictEqual(task.emit(), fork)
    })
  })
  describe('.fork()', () => {
    it('should return the function provide to the Task monad', () => {
      const fork = (x) => x + 67
      const task = Task(fork)
      const returnedFork = task.fork
      assert.deepStrictEqual(returnedFork, fork)
    })
    it('should execute supplied fork function when called via the Task monad', () => {
      const fork = (x) => x + 67
      const task = Task(fork)
      assert.deepStrictEqual(task.fork(2), 69)
    })
  })
  describe('.map()', () => {
    it('should return a new Task in which the function passed which will use the current Tasks resolve value as it\'s argument', () => {
      const fork = (_, resolve) => resolve(67)
      const func = (b) => b + 2
      const task = Task(fork)
      const taskB = task.map(func)
      taskB.fork(() => {}, (b) => assert.deepStrictEqual(b, 69))
    })
    it('should be able to use dot notation with the map() function', () => {
      const fork = (_, resolve) => resolve(66)
      const func = (b) => b + 1
      const func2 = (b) => b + 2
      const task = Task(fork)
      const taskB = task.map(func).map(func2)
      taskB.fork(() => {}, (b) => assert.deepStrictEqual(b, 69))
    })
  })
  describe('.chain()', () => {
    it('should use the argument passed in (which must return a Task) and return a new task, once map is called the function are executed in sequence', () => {
      const forkA = (_, resolve) => resolve(67)
      const task = Task(forkA)
      const taskB = task.chain((a) => Task((_, resolve) => resolve(a + 1)))
      taskB.fork(() => {}, b => assert.deepStrictEqual(b, 68))
    })
    it('should reject from fork A', () => {
      const forkA = (reject, _) => reject(false)
      const task = Task(forkA)
      const taskB = task.chain((a) => Task((_, resolve) => resolve(a + 1)))
      taskB.fork(b => assert.deepStrictEqual(b, false), () => {})
    })
    it('should reject from fork B', () => {
      const forkA = (_, resolve) => resolve(true)
      const task = Task(forkA)
      const taskB = task.chain((a) => Task((reject, _) => reject(false)))
      taskB.fork(b => assert.deepStrictEqual(b, false), () => {})
    })
  })
  describe('expected behaviour', () => {
    it('should work as expected when using function chaining (when it should resolve only)', () => {
      Task((_, resolve) => resolve(1))
        .map(x => x + 2)
        .map(x => x + 3)
        .chain(x => Task((_, resolve) => resolve(x + 4)))
        .map(x => x + 5)
        .fork(() => {}, x => assert.deepStrictEqual(x, 15))
    })
    it('should work as expected when using function chaining (when it should reject only)', () => {
      Task((reject, _) => reject(1))
        .map(x => x + 2)
        .map(x => x + 3)
        .chain(x => Task((_, resolve) => resolve(x + 4)))
        .map(x => x + 5)
        .fork(x => assert.deepStrictEqual(x, 1), () => {})
    })
  })
})
