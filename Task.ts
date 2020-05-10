enum TypeName { TASK = "Task" }
type TFork<TReject, TResolve> = (reject: (a: TReject) => void, resolve: (a: TResolve) => void) => void
type TInspect = () => string
type TEmit<TReject, TResolve> = () => TFork<TReject, TResolve>
type TMap<TReject, TResolve extends {}> = <T extends {}>(f: (x: TResolve) => T) => ITask<TReject, T>
type TChain<TResolve> = <T, U>(f: (x: TResolve) => ITask<T, U>) => ITask<T, U>
type ITask<TReject, TResolve extends {}> = {
  inspect: TInspect,
  emit: TEmit<TReject, TResolve>,
  fork: TFork<TReject, TResolve>,
  map: TMap<TReject, TResolve>,
  chain: TChain<TResolve>
}
type TTask = <TReject, TResolve>(fork: TFork<TReject, TResolve>) => ITask<TReject, TResolve>

const TASK_TYPE: TypeName = TypeName.TASK
const Task: TTask = (fork) => ({
  inspect: () => `${TASK_TYPE}(${fork})`,
  emit: () => fork,
  fork,
  map: f => Task((reject, resolve) => fork(reject, a => resolve(f(a)))),
  chain: f =>
    Task((reject, resolve) => fork(reject, a =>
      f(a).fork(reject, resolve))),
})

Task<string, string>((reject, _) => reject("a"))
  .map<string>((x) => x.isUser === current)

  .fork((x: string) => console.log('the reject value is ', x), () => void 0)


Task<string, string>((reject, resolve) => apiFirst.getConfi("/withUser"))
  .map((x) => x + "b")
  .map<number>((x) => 10)
  .chain<string, string>((x) => Task<string, number>((_, resolve) => resolve(x + 20)))
  .map((x: string) => x + "e")
  .fork((x: string) => console.log('the reject value is ', x), () => void 0)

  /*
Task<number, number>((_, resolve) => resolve(1))
  .map((x: number) => x + 2)
  .map((x: number) => x + 3)
  .chain((x: number) => Task<number, number>((_, resolve) => resolve(x + 4)))
  .map((x: number) => x + 5)
  .fork(() => void 0, x => console.log('the resolve value is ', x)) */

module.exports = Task