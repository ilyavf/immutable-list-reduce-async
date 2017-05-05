const Task = require('data.task')
const { List } = require('./index')

var app = List([1, 2, 3]).reduceAsync((acc, x) => Task.of(acc + x), 0)

app.fork(err => console.log(err),
  res => console.log(res))