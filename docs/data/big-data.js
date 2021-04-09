import {range, compose, flatten, map, lensProp, over} from "ramda"
import data from "../../src/data.json"

const bigData = compose(
  flatten,
  map(i => data.map(over(lensProp("id"), id => `id:${i}:${id}`))),
)(range(1, 11))

export default bigData
