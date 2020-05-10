import * as T from 'fp-ts/lib/Task';

const t: T.Task<number> = T.task.of<number>(64)
t().then((x:number) => console.log(x))

const t2: T.Task<number> = () => Promise.resolve(128)
t2().then((x: number) => console.log(x))

const t3: T.Task<number> = T.task.map(t2, (x: number) => x * 2)
t3().then((x: number) => console.log(x))

const t4: T.Task<number> = T.task.chain(t3, (x): T.Task<number> => () => Promise.resolve(x * 2))
t4().then((x: number) => console.log(x))






