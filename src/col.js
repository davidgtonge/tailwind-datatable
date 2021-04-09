import clsx from "classnames"
import {isNil} from "ramda"
import Icon from "./icon"

const Col = ({col, onClick, sort}) => {
  return (
    <th
      onClick={onClick}
      scope="col"
      className={clsx(
        "bg-gray-200 hidden sm:table-cell sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider",
        {"cursor-pointer select-none": col.sort},
        {"text-right": col.number},
      )}
    >
      <div className="flex items-center">
        <span>{col.label || ""}</span>
        {col.sort ? (
          <span>
            {isNil(sort) ? (
              <span style={{color: "rgba(0,0,0,0.2)"}}>
                <Icon name="descending" className="w-3 h-3 ml-2" />
              </span>
            ) : null}
            {sort === true ? (
              <Icon name="ascending" className="w-3 h-3 ml-2" />
            ) : null}
            {sort === false ? (
              <Icon name="descending" className="w-3 h-3 ml-2" />
            ) : null}
          </span>
        ) : null}
      </div>
    </th>
  )
}

export default Col
