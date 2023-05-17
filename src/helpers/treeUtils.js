export const findNodeAndChilds = (nodeId, nodes) => {
  const findNodeById = (nodeId, nodes) => {
    for (let node of nodes) {
      if (node.id === nodeId) {
        return node
      }
      if (node.children.length > 0) {
        let nestedNode = findNodeById(nodeId, node.children)
        if (nestedNode) {
          return nestedNode
        }
      }
    }
    return null
  }

  const getAllChildrenIds = (node) => {
    if (!node) {
      return null
    }
    const childIds = node.children.flatMap((child) => [
      child.id,
      ...getAllChildrenIds(child),
    ])
    return childIds
  }

  const node = findNodeById(nodeId, nodes)
  return getAllChildrenIds(node)
}

export const extractIds = (arr) => {
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

export const clearDeletableIds = (nodes, toRemove) => {
  const findAndRemoveNodes = (nodes, removeId) => {
    let foundId = null
    nodes.forEach((el, index) => {
      if (el.id === removeId) {
        foundId = el.id
        nodes.splice(index, 1)
      } else if (el.children.length > 0) {
        const result = findAndRemoveNodes(el.children, removeId)
        if (result !== null) {
          foundId = result
        }
      }
    })
    return foundId
  }

  for (let i = 0; i < toRemove.length; i++) {
    let removeId = null
    if (typeof toRemove[i] === 'object') {
      removeId = parseInt(Object.keys(toRemove[i])[0])
    } else {
      removeId = toRemove[i]
    }

    const foundId = findAndRemoveNodes(nodes, removeId)
    if (foundId !== null) {
      toRemove.splice(i, 1)
      i--
    }
  }
}
