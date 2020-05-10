import { Eq, getStructEq } from 'fp-ts/lib/Eq'

type Point = {
  x: number
  y: number
}

const eqNumber: Eq<number> = {
  equals: (x: number, y: number) => x === y
}

const eqPoint: Eq<Point> = getStructEq({
   x: eqNumber,
   y: eqNumber
})

const point1: Point = { x: 0, y: 1}
const point2: Point = { x: 0, y: 1}

console.log(eqPoint.equals(point1, point2))
