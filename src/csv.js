/* Inspired by https://github.com/gregnb/mui-datatables/blob/master/src/utils.js */

import {
  identity,
  map,
  pluck,
  join,
  flatten,
  when,
  is,
  prop,
  filter,
  compose,
  reduce,
} from "ramda"

const SEP = ","
const NL = "\r\n"

const getDownloadUri = csv => {
  const dataURI = `data:text/csv;charset=utf-8,${csv}`
  const URL = window.URL || window.webkitURL
  const downloadURI =
    typeof URL.createObjectURL === "undefined"
      ? dataURI
      : URL.createObjectURL(new Blob([csv], {type: "text/csv"}))
  return downloadURI
}

const getKeys = compose(
  filter(identity),
  flatten,
  map(when(is(Array), map(when(is(Object), prop("key"))))),
  pluck("key"),
)

const createHeader = compose(
  join(SEP),
  map(item => `"${item}"`),
)

const getSafeString = (item, key) =>
  (is(String, item[key]) ? item[key] : JSON.stringify(item[key]))
    .replace(/\"/g, '""')
    .replace(/^\+|^\-|^\=|^\@/g, "'$&")

const createRows = keys =>
  reduce(
    (out, item) =>
      out + keys.map(key => `"${getSafeString(item, key)}"`).join(SEP) + NL,
    "",
  )

export default function downloadCSV({cols, data, filename = "download.csv"}) {
  const keys = getKeys(cols)

  const header = createHeader(keys)
  const rows = createRows(keys)(data)

  const csv = `${header}${NL}${rows}`.trim()
  const downloadURI = getDownloadUri(csv)

  const link = document.createElement("a")
  link.setAttribute("href", downloadURI)
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
