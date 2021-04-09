import {useRef, useState, useEffect} from "react"
import {sortData, filterData} from "./data-fns"
import {path, toPairs} from "ramda"

export const useDebouncedEffect = (fn, args, time) => {
  const ref = useRef()
  useEffect(() => {
    clearTimeout(ref.current)
    ref.current = setTimeout(fn, time)
    return () => clearTimeout(ref.current)
  }, args)
}

export const useInteractionEffect = (root, target, fn) => {
  useEffect(() => {
    if (target.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach((en, idx) => {
          console.log(idx, en)
          if (en.isIntersecting) {
            console.log("calling")
            fn()
          }
        })
      })
      observer.observe(target.current, {root: root.current})
      return () => observer.disconnect()
    }
  }, [target])
}

export const useExternalInteractionEffect = (target, fn) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (target.current && !target.current.contains(event.target)) {
        fn()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [target])
}

export const useDefferredEffect = (fn, args) => {
  const ref = useRef()
  useEffect(() => {
    cancelAnimationFrame(ref.current)
    ref.current = requestAnimationFrame(fn)
    return () => cancelAnimationFrame(ref.current)
  }, args)
}

export const useSort = (data, cols) => {
  const [sort, setSort] = useState({})
  const [sortedData, setSortedData] = useState(data)
  const [key, direction] = toPairs(sort)[0] || []
  const toggleSort = idx => () => {
    setSort({[idx]: !sort[idx]})
  }

  useEffect(() => {
    setSortedData(sortData(path([key, "sortFn"], cols), direction, data))
  }, [data, key, direction])

  return [sort, toggleSort, sortedData]
}

export const useFilter = (data, cols, search, filters) => {
  const [filteredData, setFilterdData] = useState(data)
  const update = () => setFilterdData(filterData(search, data, cols, filters))

  useDebouncedEffect(update, [search], 300)

  useEffect(() => {
    update()
  }, [cols, data, filters])

  return filteredData
}
