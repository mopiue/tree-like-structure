import { useSelector } from 'react-redux'
import NodeElement from '../NodeElement/NodeElement'
import styles from './NodeList.module.scss'

function NodeList() {
  const nodes = useSelector((state) => state.tree.nodes)

  const throughTress = (nodes, nestingLevel = 0) => {
    const result = []
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      if (Array.isArray(node)) {
        nestingLevel += 1
        result.push(...throughTress(node, nestingLevel))
        nestingLevel -= 1
      } else {
        result.push({ node, nestingLevel })
      }
    }
    return result
  }

  const treesData = throughTress(nodes)

  return (
    <div className={styles.NodeList}>
      <ul>
        {treesData.map(({ node, nestingLevel }, index) => (
          <NodeElement key={index} nestingLevel={nestingLevel} node={node} />
        ))}
      </ul>
    </div>
  )
}

export default NodeList
