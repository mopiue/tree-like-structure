import { useDispatch, useSelector } from 'react-redux'
import { selectNode } from '../../features/nodesSlice'

function NodeElement({ node }) {
  const dispatch = useDispatch()
  const nestingMarginMultiplier = useSelector(
    (state) => state.nodes.nestingMarginMultiplier
  )
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )
  const currentEditNodeId = useSelector(
    (state) => state.nodes.currentEditNodeId
  )

  const handleNodeClick = (nodeId) => {
    dispatch(selectNode(nodeId))
  }

  const StyleNodeElement = {
    width: '100%',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor:
      currentSelectedNodeId === node.id ? 'rgb(20, 198, 58)' : '',
  }

  const StyleInputEdit = {
    width: '200px',
    border: 'none',
    backgroundColor: '#cbf9d5',
    height: '30px',
    outline: 'none',
    paddingLeft: '10px',
    color: 'rgb(20, 198, 58)',
    fontSize: '16px',
  }

  const StyleNodeElementLi = {
    marginLeft: node.nestingLevel * nestingMarginMultiplier,
    listStyleType: 'none',
    color: currentSelectedNodeId === node.id ? 'white' : 'rgb(20, 198, 58)',
  }

  return (
    <span style={StyleNodeElement}>
      <li style={StyleNodeElementLi} onClick={() => handleNodeClick(node.id)}>
        {node.id === currentEditNodeId ? (
          <input type="text" style={StyleInputEdit} />
        ) : (
          node.value
        )}
      </li>
    </span>
  )
}

export default NodeElement
