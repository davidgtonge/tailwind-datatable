import clsx from "classnames"
import {useState, useRef, useEffect, useMemo} from "react"
import {useInteractionEffect, useSort, useFilter} from "./hooks"
import download from "./csv"
import Row from "./row"
import Col from "./col"
import Header from "./header"
import {normaliseColumns} from "./data-fns"

const OFFSET = 10

export default function Table({
  data,
  columns,
  title = "",
  options = {},
  className,
}) {
  const {cols, hasFilter, hasSearch} = useMemo(
    () => normaliseColumns(columns),
    [columns],
  )

  const [limit, setLimit] = useState(OFFSET)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState([])
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)

  const filteredData = useFilter(data, cols, search, filters)
  const [sort, toggleSort, sortedData] = useSort(filteredData, cols)

  useEffect(() => {
    setLimit(OFFSET)
    scrollRef.current.scrollTop = 0
  }, [sortedData])

  const addItems = () => {
    let add = OFFSET
    const fn = () => {
      setLimit(l => l + 2)
      add -= 2
      if (add > 0) {
        requestAnimationFrame(fn)
      }
    }
    requestAnimationFrame(fn)
  }

  useInteractionEffect(scrollRef, bottomRef, addItems)

  return (
    <div className={className}>
      <Header
        options={options}
        title={title}
        search={search}
        filters={filters}
        hasFilter={hasFilter}
        hasSearch={hasSearch}
        setFilters={setFilters}
        setSearch={setSearch}
        onDownload={() => download({cols, data})}
      />

      <div
        ref={scrollRef}
        className="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg"
        style={{scrollBehavior: "smooth", height: options.height}}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 dark:bg-black dark:bg-opacity-20">
            <tr>
              {cols.map((col, idx) => (
                <Col
                  col={col}
                  key={idx}
                  onClick={col.sort ? toggleSort(idx) : null}
                  sort={sort[idx]}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.slice(0, limit).map((row, idx) => (
              <Row idx={row.id} key={row.id} data={row} columns={cols} />
            ))}
            <tr ref={bottomRef}>
              <td
                colspan={cols.length}
                className={clsx("w-full py-1", {
                  hidden: sortedData.length < limit,
                })}
              >
                Load More
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
