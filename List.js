const LIST_TYPE_NAME = 'List'

const List = x => {
  return {
    emit: () => x,
    chain: f => f(x),
    map: f => List.of(f(x)),
    inspect: () => `${LIST_TYPE_NAME}([${x}])`,
    concat: list => List.of(x.concat(list)),
    head: () => x[0],
    peak: () => x[x.length - 1],
    min: () => {
      let min = x[0]
      for (let i = 1; i < x.length; i++) {
        min = x[i] < min ? x[i] : min
      }
      return min
    },
    max: () => {
      let max = x[0]
      for (let i = 1; i < x.length; i++) {
        max = x[i] > max ? x[i] : max
      }
      return max
    }
  }
}

List.of = x => {
  if (x instanceof Array) {
    return List(x)
  } else {
    throw new Error('The value passed to .of() must be of the type Array')
  }
}

module.exports = List
