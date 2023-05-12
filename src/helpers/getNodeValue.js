const getNodeValue = (id, nodes) => {
  let result = null

  nodes.forEach((node) => {
    if (node.id === id) {
      result = node.value
    } else if (node.children.length > 0) {
      const childValue = getNodeValue(id, node.children)
      if (childValue) result = childValue
    }
  })

  return result
}

export default getNodeValue
