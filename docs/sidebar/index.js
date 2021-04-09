import {Link} from "@reach/router"
import clsx from "classnames"

const isActive = ({isCurrent}) => ({
  className: clsx(
    {"bg-primary-50 dark:bg-primary border-primary-600 dark:border-white text-primary-600 dark:text-white": isCurrent},
    {
      "border-transparent text-gray-600 dark:text-white hover:bg-primary-800 hover:text-gray-100": !isCurrent,
    },
    "group sm:flex items-center px-3 py-2 text-sm font-medium border-l-4",
  ),
})

const ExactNavLink = props => <Link getProps={isActive} {...props} />

export default function Sidebar({items, hero}) {
  return (
    <div className="flex flex-col w-full sm:w-64">
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white dark:bg-primary-dark overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 space-y-5">
          {hero}
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 bg-white dark:bg-opacity-10 space-y-1" aria-label="Sidebar">
            {items.map(item => (
              <ExactNavLink to={item.to}>{item.label}</ExactNavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
