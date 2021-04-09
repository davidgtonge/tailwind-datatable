import React from "react"

export const pages = [
  {
    to: "basic",
    label: "Basic",
    component: React.lazy(() => import("./basic")),
  },
  {
    to: "sort",
    label: "Sort",
    component: React.lazy(() => import("./sort")),
  },
  {
    to: "infinite-scroll",
    label: "Infinite Scroll",
    component: React.lazy(() => import("./infinite-scroll")),
  },
]
