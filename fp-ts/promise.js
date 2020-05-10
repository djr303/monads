var promise = function () { return Promise.resolve(32); };
promise().then(function (x) { return console.log(x); });
var promise2 = function () { return Promise.reject(NaN); };
promise2().then(function (x) { return console.log(x); }).catch(function (e) { return console.log(e); });
var promise3 = function () { return new Promise(function (resolve, _) {
    throw new Error('Error here');
}); };
promise3().then(function (x) { return console.log(x); }, function (e) { return console.log('e.message?', e.message); });
