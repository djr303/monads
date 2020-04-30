/* const Task = fork => ({
  map: f => Task((reject, resolve) => fork(reject, a =>
        resolve(f(a)))),
  chain: f =>
    Task((reject, resolve) => fork(reject, a =>
        f(a).fork(reject, resolve))),
  fork,
}) */

enum TypeName {
  TASK = "Task"
}

const TASK_TYPE: TypeName = TypeName.TASK

const Task = fork => ({
  inspect: () => `${TASK_TYPE}(${fork})`,
  emit: () => fork,
  of: (f) => Task(f)
})


module.exports = Task