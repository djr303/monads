const promise = () => Promise.resolve(32)
promise().then(x => console.log(x))

const promise2 = () => Promise.reject(NaN)
promise2().then(x => console.log(x)).catch(e => console.log(e))

const promise3 = () => new Promise((resolve, _) => {
  throw new Error('Error here');
})

promise3().then(x => console.log(x), (e) => console.log('e.message?', e.message))