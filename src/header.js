import {useState, useRef} from "react"
import {useExternalInteractionEffect} from "./hooks"
import Icon from "./icon"
import SearchInput from "./search-input"

export default function TitleSearch({
  title,
  search,
  setSearch,
  filters,
  setFilters,
  hasSearch,
  hasFilter,
  options,
  onDownload,
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const dropdownRef = useRef(null)
  useExternalInteractionEffect(dropdownRef, () => setFilterOpen(false))

  return (
    <div className="flex justify-between align-baseline">
      <div className="flex-1">
        {searchOpen ? (
          <div className="max-w-lg">
            <SearchInput
              name="search"
              placeholder="enter search term"
              onChange={setSearch}
              onClose={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <h1 className="text-2xl px-4">{title}</h1>
        )}
      </div>
      <div className="flex relative">
        {hasSearch ? (
          <button onClick={() => setSearchOpen(true)}>
            <Icon className="w-5 h-5 ml-2" name="search" />
          </button>
        ) : null}

        {options.download ? (
          <button onClick={() => onDownload()}>
            <Icon className="w-5 h-5 ml-2" name="download" />
          </button>
        ) : null}

        {hasFilter ? (
          <div>
            <button onClick={() => setFilterOpen(true)}>
              <Icon className="w-5 h-5 ml-2" name="filter" />
            </button>
            <div ref={dropdownRef}>
              {filterOpen ? (
                <div className="bg-white p-6 rounded shadow absolute w-min right-0 z-10">
                  <div class="py-2 mb-2 border-b-2 border-gray-200" role="none">
                    <p class="text-sm text-gray-600" role="none">
                      Add New Filter
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
