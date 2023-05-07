import { useDispatch, useSelector } from 'react-redux'
import { addNode, selectNode } from '../../features/nodesSlice'

function NodeElement({ node }) {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.tree.nodes)
  const nestingMultiplier = useSelector((state) => state.tree.nestingMultiplier)
  const currentSelectedNode = useSelector(
    (state) => state.tree.currentSelectedNode
  )

  const handleNodeClick = (nodeId) => {
    dispatch(selectNode(nodeId))
  }

  const StyleNodeElement = {
    width: '100%',
    padding: '10px',
    backgroundColor: currentSelectedNode === node.id ? 'rgb(20, 198, 58)' : '',
  }

  const StyleNodeElementLi = {
    marginLeft: node.nestingLevel * nestingMultiplier,
    listStyleType: 'none',
    color: currentSelectedNode === node.id ? 'white' : 'rgb(20, 198, 58)',
  }

  return (
    <span style={StyleNodeElement}>
      <li style={StyleNodeElementLi} onClick={() => handleNodeClick(node.id)}>
        {node.value}
      </li>
    </span>
  )
}

export default NodeElement
