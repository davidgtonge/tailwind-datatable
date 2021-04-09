import {
  is,
  sortWith,
  prop,
  isNil,
  ascend,
  descend,
  map,
  compose,
  values,
  toLower,
  propEq,
  pick,
  identity,
  mergeRight,
  pluck,
  join,
  unapply,
  converge,
} from "ramda"

export const normaliseColumns = columns => {
  let hasSearch = false
  let hasFilter = false
  const cols = map(col => {
    let sort = col.sort
    let sortFn
    let search = col.search
    let searchFn
    let filter = col.filter
    let filterFn

    if (sort) {
      sortFn = prop(col.key)
    }
    if (search) {
      searchFn = prop(col.key)
    }
    if (filter) {
      filterFn = prop(col.key)
    }

    if (is(Array, col.key)) {
      const sortCol = col.key.find(prop("sort"))
      if (sortCol) {
        sort = true
        sortFn = prop(sortCol.key)
      }
      const searchCols = col.key.filter(propEq("search", true))
      console.log({searchCols})
      if (searchCols.length) {
        search = true
        searchFn = compose(join(" "), values, pick(pluck("key", searchCols)))
      }
      const filterCols = col.key.filter(prop("filter"))
      if (filterCols.length) {
        filter = true
        filterFn = compose(join(" "), values, pick(pluck("key", filterCols)))
      }
    }

    hasSearch = hasSearch || search
    hasFilter = hasFilter || filter

    return mergeRight(col, {sort, sortFn, search, searchFn})
  })(columns)

  return {cols, hasSearch, hasFilter}
}

export const sortData = (sortFn, sortDirection, data) => {
  if (isNil(sortFn)) {
    return data
  }
  const sortModifier = sortDirection ? ascend : descend
  return sortWith([sortModifier(sortFn)])(data)
}

const getSearchFn = cols =>
  converge(
    compose(toLower, unapply(join(" "))),
    pluck("searchFn", cols).filter(identity),
  )

export const filterData = (search, data, cols) => {
  if (!search) {
    return data
  }
  const searchFn = getSearchFn(cols)
  const lcSearch = search.toLowerCase()
  return data.filter(item => searchFn(item).includes(lcSearch))
}
