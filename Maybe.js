const JUST_TYPE_NAME = 'Just'
const NOTHING_TYPE_NAME = 'Nothing'

const Just = (x) => ({
  chain: f => f(x),
  emit: () => x,
  map: f => Maybe.of(f(x)),
  fork: (_, g) => g(x),
  isJust: true,
  isNothing: false,
  inspect: () => `${JUST_TYPE_NAME}(${x})`
})

const Nothing = (x) => ({
  chain: _ => Nothing(),
  emit: () => Nothing(),
  map: _ => Nothing(),
  fork: (f, _) => f(),
  isJust: false,
  isNothing: true,
  inspect: () => NOTHING_TYPE_NAME
})

const Maybe = {
  of: x => x === null || x === undefined || x.isNothing ? Nothing() : Just(x)
}

module.exports = Maybe
