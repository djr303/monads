/* const Task = fork => ({
  map: f => Task((reject, resolve) => fork(reject, a =>
        resolve(f(a)))),
  chain: f =>
    Task((reject, resolve) => fork(reject, a =>
        f(a).fork(reject, resolve))),
  fork,
}) */
var TypeName;
(function (TypeName) {
    TypeName["TASK"] = "Task";
})(TypeName || (TypeName = {}));
var TASK_TYPE = TypeName.TASK;
var Task = function (fork) { return ({
    inspect: function () { return TASK_TYPE + "(" + fork + ")"; },
    emit: function () { return fork; },
    of: function (f) { return Task(f); }
}); };
module.exports = Task;
