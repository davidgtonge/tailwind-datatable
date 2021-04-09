import {is} from "ramda"
import clsx from "classnames"
import Tag from "./tag"

const getMultiValue = (keys, data) => (
  <div className="text-right sm:text-left">
    {keys.map(key => {
      if (is(String, key)) {
        return <span>{data[key]} </span>
      }
      const val = data[key.key]
      return (
        <span className={clsx({"text-gray-800": key.bold, block: key.block})}>
          {val}{" "}
        </span>
      )
    })}
  </div>
)

const Item = ({col, data, idx}) => {
  const value = is(Array, col.key)
    ? getMultiValue(col.key, data)
    : data[col.key]

  const formatted = col.format ? col.format(value, data) : value
  const content =
    col.tag || col.boolean ? (
      <Tag boolean={col.boolean} value={value} discrete={!!col.tag}>
        {formatted}
      </Tag>
    ) : (
      formatted
    )
  return (
    <div className="flex justify-between">
      <span className="sm:hidden text-gray-400 mr-2 text-xs">
        {col.label || ""}
      </span>
      {content}
    </div>
  )
}

export default Item