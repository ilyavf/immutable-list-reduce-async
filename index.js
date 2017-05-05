const Immutable = require('immutable')
const { List } = Immutable
const Task = require('data.task')

// reduceAsync :: (b -> a -> Task b) -> b -> Task b
List.prototype.reduceAsync = function (reducer, acc) {
  return this.size === 0
    ? Task.of(acc)
    : reducer(acc, this.first())
      .chain(a => this.shift().reduceAsync(reducer, a))
}

module.exports = Immutable