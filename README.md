# immutable-list-reduce-async
Small extention to the immutable list to perform an async reducer

This can be useful if a reducer function has to perform an asynchronous operation. So, instead of a result it returns
an instance of a Task (from `data.task` package):

```js
// myReducer :: b -> a -> Task b
const myReducer = (acc, el) =>
  new Task((reject, resolve) => {
    // Some async action here.
    setTimeout(function () {
      resolve(acc + el)
    }, 0)
  })

// reduceAsync :: (b -> a -> Task b) -> b -> Task b
List.prototype.reduceAsync
```

## Example:
```js
const Task = require('data.task')
const { List } = require('./index')

// Reduce to the sum of list elements with an async action (Task):
var app = List([1, 2, 3]).reduceAsync((acc, x) => Task.of(acc + x), 0)

app.fork(err => console.log(err),
         res => console.log(res))

// >>> 6
```