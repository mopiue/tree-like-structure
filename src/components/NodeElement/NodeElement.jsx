import styles from './NodeElement.module.scss'

function NodeElement({ nestingLevel, node }) {
  return (
    <span className={styles.NodeElement}>
      <li
        style={{
          marginLeft: nestingLevel * 25,
        }}
      >
        {node}
      </li>
    </span>
  )
}

export default NodeElement
