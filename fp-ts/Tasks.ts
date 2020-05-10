import { Task, of, map, chain, } from 'fp-ts/lib/Task'

const t: Task<number> = of<number>(64)
t().then((x:number) => console.log(x))

const t2: Task<number> = () => Promise.resolve(128)
t2().then((x: number) => console.log(x))

const map1 = map<number, number>((x: number) => x * 2)
const t3 = map1(t2)
t3().then((x: number) => console.log(x))

const chain1 = chain<number, number>((x :number) => () => Promise.resolve(x * 2))
const t4 = chain1(t3);
t4().then((x: number) => console.log(x))