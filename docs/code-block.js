import Highlight, {defaultProps} from "prism-react-renderer"

export default ({children, className = "javascript"}) => {
  const language = className.replace(/language-/, "")

  return (
    <div className="sm:max-w-xl">
      <Highlight {...defaultProps} code={children} language={language}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={className + " rounded-xl shadow"} style={{...style, padding: "20px"}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
