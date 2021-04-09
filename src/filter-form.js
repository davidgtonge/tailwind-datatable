import {prop, propEq} from "ramda"

const SelectWithLabel = ({name, label, options, className}) => (
  <div className={className}>
    <label htmlFor={name} class="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={name}
      name={name}
      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </select>
  </div>
)

const getFilterModifier = (column) => {
  if(!column){
    return <div className="w-32">Please select a column</div>
  }
  if(column.boolean) {
    return <SelectWithLabel  /> 
  }
}

export default function FilterForm({cols, onSave, filters}) {
  const [column, setColumn] = useState()
  const [operator, setOperator] = useState({})
  

  const columnOptions = cols.filter(prop("filter")).map(prop("label"))

  const selectedColumn = cols.find(propEq("label", column))
  const filterModifier = getFilterModifier(selectedColumn)

  /*
  string - will have is / is not / contains / does not contain
  number - greater than / less than / between / equals
  tag - is / is not
  boolean - on / off

  */

  return (
    <div className="flex">
      <SelectWithLabel
        className="w-32 mr-3"
        name="column"
        label="Column"
        options={columnOptions}
      />
      {}
      <SelectWithLabel
        className="w-32 mr-3"
        name="operator"
        label="Operator"
        options={["is", "is not", "contains", "doesn't contain"]}
      />
      <SelectWithLabel
        className="w-32"
        name="value"
        label="Value"
        options={["foo", "bar"]}
      />
    </div>
  )
}
