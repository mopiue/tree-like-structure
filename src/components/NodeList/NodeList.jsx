import { useSelector } from 'react-redux'
import NodeElement from '../NodeElement/NodeElement'
import { extractIds } from '../../helpers/treeUtils'
import styles from './NodeList.module.scss'

function NodeList() {
  const nodes = useSelector((state) => state.nodes.nodes)
  const toRemove = useSelector((state) => state.nodes.toRemove)

  const findNodes = (nodes, items, parentNestingLevel = -1) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const nestingLevel = parentNestingLevel + 1

      items.push({ ...node, nestingLevel })

      if (node.children) {
        findNodes(node.children, items, nestingLevel)
      }
    }

    const deletableIds = extractIds(toRemove)
    return items.filter((node) => !deletableIds.includes(node.id))
  }

  const nodeValues = findNodes(nodes, [])

  return (
    <div className={styles.NodeList}>
      <ul>
        {nodeValues.map((node, index) => (
          <NodeElement key={index} node={node} />
        ))}
      </ul>
    </div>
  )
}

export default NodeList
