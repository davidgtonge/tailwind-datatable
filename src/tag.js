const cache = []
const colours = [
  ["bg-yellow-100", "text-yellow-800"],
  ["bg-pink-100", "text-pink-800"],
  ["bg-blue-100", "text-blue-800"],
  ["bg-indigo-100", "text-indigo-800"],
]

const discreteColours = val => {
  let idx = cache.indexOf(val)
  if (idx === -1) {
    idx = cache.push(val) - 1
  }
  return colours[idx % colours.length]
}

const getColor = ({color, boolean, discrete, value}) => {
  if (color) {
    return color
  }
  if (boolean) {
    return value
      ? ["bg-green-100", "text-green-800"]
      : ["bg-red-100", "text-red-800"]
  }
  if (discrete) {
    return discreteColours(value)
  }
  return ["bg-gray-100", "text-gray-800"]
}

export default function Tag({children, color, boolean, discrete, value}) {
  const [bg, text] = getColor({color, boolean, discrete, value})

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bg} ${text}`}
    >
      {children}
    </span>
  )
}
