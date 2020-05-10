import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/pipeable";

const chainExample = pipe(
  TE.taskEither.of(1),
  TE.chain((result: number) => TE.tryCatch<Error, number>(
    () => new Promise((resolve, reject) => { throw new Error('random error'); }),
    error => new Error(String(error))
  )),
  TE.chain((result: number) => TE.tryCatch<Error, number>(
    () => new Promise((resolve, reject) => reject(result * 2)),
    error => new Error(String(error))
  )),
  TE.chain((result: number) => TE.tryCatch<Error, number>(
    () => new Promise((resolve, reject) => resolve(result * 2)),
    error => new Error(String(error))
  )),
)

chainExample().then(e => pipe(
  e,
  E.fold(
    err => console.log(`Chain error! (${err.message})`),
    (x: number) => console.log('Chain success!', x)
  )
))

const mapExample = pipe(
  TE.taskEither.of<Error, number>(1),
  TE.map<number, string>((x: number) => x.toString())
)

mapExample().then(e => pipe(
  e,
  E.fold(
    err => console.log(`Map Error! (${err.message})`),
    (x: string) => console.log('Map success!', x)
  )
))