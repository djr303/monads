/* global describe, it */
const assert = require('assert')
const Maybe = require('../Maybe')

describe('Maybe', () => {
  describe('.of()', () => {
    it('should return a Just monad when the value passed to .of() is not null or undefined', () => {
      const value = Maybe.of(1)
      assert.strictEqual(value.inspect(), 'Just(1)')
    })
    it('should return a Nothing monad when null is passed is null', () => {
      const value = Maybe.of(null)
      assert.strictEqual(value.inspect(), 'Nothing')
    })
    it('should return a Nothing monad when null is passed is undefined', () => {
      const value = Maybe.of()
      assert.strictEqual(value.inspect(), 'Nothing')
    })
  })
  describe('Nothing', () => {
    const getNothing = () => Maybe.of()

    describe('.chain()', () => {
      it('should return a new nothing monad when called', () => {
        const nothing = getNothing()
        const newNothing = nothing.chain(() => {})
        assert.strictEqual(newNothing.inspect(), 'Nothing')
      })
    })
    describe('.emit()', () => {
      it('should return a new nothing monad when called', () => {
        const nothing = getNothing()
        const newNothing = nothing.emit()
        assert.strictEqual(newNothing.inspect(), 'Nothing')
      })
    })
    describe('.map()', () => {
      it('should return a new norhing monad when called', () => {
        const nothing = getNothing()
        const newNothing = nothing.map(() => {})
        assert.strictEqual(newNothing.inspect(), 'Nothing')
      })
    })
    describe('.fork()', () => {
      it('should call the function passed into the fork() method when fork() is called', () => {
        const nothing = getNothing()
        let closureValue = 1
        const plusOne = () => {
          closureValue++
        }
        nothing.fork(plusOne, () => {})
        assert.strictEqual(closureValue, 2)
      })
    })
    describe('.isJust', () => {
      it('should be false when monad is Nothing', () => {
        const nothing = getNothing()
        assert.strictEqual(nothing.isJust, false)
      })
    })
    describe('.isNothing', () => {
      it('should be false when monad is Nothing', () => {
        const nothing = getNothing()
        assert.strictEqual(nothing.isNothing, true)
      })
    })
    describe('.inspect()', () => {
      it('should return Nothing type name when called', () => {
        const nothing = getNothing()
        assert.strictEqual(nothing.inspect(), 'Nothing')
      })
    })
  })
  describe('Just', () => {
    const getJust = x => Maybe.of(x || 1)

    describe('.chain()', () => {
      it('should return a unwrapped value from the monad as function of the argument passed in', () => {
        const just = getJust()
        assert.strictEqual(just.chain(x => x + 1), 2)
      })
    })
    describe('.emit()', () => {
      it('should return a unwrapped value from the monad', () => {
        const just = getJust()
        assert.strictEqual(just.emit(), 1)
      })
    })
    describe('.map()', () => {
      it('should return a new monad of the correct type wrapping the value as a function of the argument passed in', () => {
        const just = getJust()
        const newJust = just.map(x => x + 1)
        assert.strictEqual(newJust.inspect(), 'Just(2)')
      })
    })
    describe('.fork()', () => {
      it('should return a new value which is a function of the argument passed in', () => {
        const just = getJust()
        assert.strictEqual(just.fork(() => {}, x => x + 1), 2)
      })
    })
    describe('.isJust', () => {
      it('should return true', () => {
        const just = getJust()
        assert.strictEqual(just.isJust, true)
      })
    })
    describe('.isNothing', () => {
      it('should return false', () => {
        const just = getJust()
        assert.strictEqual(just.isNothing, false)
      })
    })
    describe('.inspect()', () => {
      it('should return the correct typename and value whe called', () => {
        const just = getJust()
        assert.strictEqual(just.inspect(), 'Just(1)')
      })
    })
  })
})
