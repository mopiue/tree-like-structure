import { useSelector } from 'react-redux'
import NodeElement from '../NodeElement/NodeElement'
import styles from './NodeList.module.scss'

function NodeList() {
  const nodes = useSelector((state) => state.tree.nodes)
  const currentSelectedNode = useSelector(
    (state) => state.tree.currentSelectedNode
  )

  const findNodes = (nodes, items, parentNestingLevel = -1) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      if (typeof node === 'object') {
        const nestingLevel = parentNestingLevel + 1
        const selected = currentSelectedNode === node.id ? true : false

        items.push({ ...node, nestingLevel, selected })

        if (node.children) {
          findNodes(node.children, items, nestingLevel)
        }
      }
    }
    return items
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
