import {MDXProvider} from "@mdx-js/react"
import {Router, Link} from "@reach/router"
import Sidebar from "./sidebar"
import DataTable from "../src/index"
import CodeBlock from "./code-block"
import {Suspense} from "react"

import {pages} from "./pages"

const components = {
  DataTable,
}

const MarkdownComponents = {
  h1: props => <h1 className="text-4xl mb-4 mt-4" {...props} />,
  h2: props => <h2 className="text-3xl mb-4 mt-4" {...props} />,
  h3: props => <h3 className="text-2xl mb-4" {...props} />,
  p: props => <p className="text-base mb-4" {...props} />,
  pre: props => <pre className="text-sm mb-4" {...props} />,
  code: CodeBlock,
}

const FirstPage = () => (
  <div path="/">
    <h1>Hello....</h1>
    <Link to="button">Show me the button</Link>
  </div>
)

const Button = () => <h1>A button...</h1>

export default function () {
  return (
    <MDXProvider components={{...components, ...MarkdownComponents}}>
      <div className="min-h-screen sm:flex bg-gray-100">
        <Sidebar
          items={pages}
          hero={
            <h2 className="text-lg text-gray-600">Tailwind Datatable Docs</h2>
          }
        />
        <div className="flex flex-grow">
          <div className="w-full bg-white dark:bg-primary-900 text-gray-800 dark:text-primary-100 px-5 py-6 sm:px-6">
            <Suspense fallback={<div>Loading...</div>}>
              <Router>
                <FirstPage path="/" />
                {pages.map(({to, component}) => {
                  const Component = component
                  return <Component path={to} />
                })}
              </Router>
            </Suspense>
          </div>
        </div>
      </div>
    </MDXProvider>
  )
}
