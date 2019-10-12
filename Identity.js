const IDENTITY_LIST_TYPE = 'Identity'

const Identity = x => ({
  emit: () => x,
  chain: f => f(x),
  map: f => Identity(f(x)),
  inspect: () => `${IDENTITY_LIST_TYPE}(${x})`
})

Identity.of = x => Identity(x)

module.exports = Identity
