import Item from "./item"
import clsx from "classnames"
import {useRef, useLayoutEffect} from "react"

const Row = ({idx: rowIDx, data, columns, setHeight}) => {
  let ref
  if (setHeight) {
    ref = useRef()
    useLayoutEffect(() => {
      setHeight(ref.current.clientHeight)
    }, [])
  }

  return (
    <tr
      ref={ref}
      className={clsx(
        "sm:bg-white dark:sm:bg-opacity-5 sm:odd:bg-gray-50  dark:sm:odd:bg-opacity-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-white dark:hover:bg-opacity-20 block sm:table-row mb-6 sm:mb-0 bg-primary-50 rounded-sm sm:rounded-none",
      )}
    >
      {columns.map((col, idx) => (
        <td
          key={idx + "rc"}
          className={clsx(
            "px-6 py-2 sm:py-4 whitespace-nowrap text-sm font-medium block sm:table-cell border-b-2 sm:border-b-0 border-gray-100",
            {"text-gray-900 dark:text-gray-50": col.bold},
            {"text-gray-500 dark:text-gray-200": !col.bold},
            {"text-right": col.number},
          )}
        >
          {" "}
          {idx === 0 ? rowIDx : null}
          <Item col={col} data={data} />
        </td>
      ))}
    </tr>
  )
}
export default Row
