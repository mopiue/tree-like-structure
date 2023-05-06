import { useDispatch, useSelector } from 'react-redux'
import { addNode } from '../../features/nodesSlice'
import styles from './NodeElement.module.scss'
import { useEffect } from 'react'

function NodeElement({ nestingLevel, node }) {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.tree.nodes)

  const handleClick = (node) => {
    dispatch(addNode(node))
  }

  return (
    <span className={styles.NodeElement}>
      <li
        style={{
          marginLeft: nestingLevel * 25,
        }}
        onClick={() => handleClick(node)}
      >
        {node}
      </li>
    </span>
  )
}

export default NodeElement
