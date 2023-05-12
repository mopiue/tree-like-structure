const extractIds = (arr) => {
  const result = []
  for (const item of arr) {
    if (typeof item === 'number') {
      result.push(item)
    } else if (typeof item === 'object' && item !== null) {
      for (const value of Object.values(item)) {
        result.push(...extractIds(value))
      }
    }
  }
  return result
}

export default extractIds
