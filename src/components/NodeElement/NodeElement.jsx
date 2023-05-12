import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { setSelectedNodeId, setEditedNodeId } from '../../features/nodesSlice'
import NodeEditInput from '../NodeEditInput/NodeEditInput'

function NodeElement({ node }) {
  const dispatch = useDispatch()
  const nestingMarginMultiplier = useSelector(
    (state) => state.nodes.nestingMarginMultiplier
  )
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )
  const currentEditedNodeId = useSelector(
    (state) => state.nodes.currentEditedNodeId
  )
  const [isCancelledEditing, setIsCancelledEditing] = useState(true)

  const StyleNodeElement = {
    width: '100%',
    height: '46px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor:
      currentSelectedNodeId === node.id ? 'rgb(20, 198, 58)' : '',
  }

  const StyleNodeElementLi = {
    marginLeft: node.nestingLevel * nestingMarginMultiplier,
    listStyleType: 'none',
    color: currentSelectedNodeId === node.id ? 'white' : 'rgb(20, 198, 58)',
  }

  const handleNodeClick = () => {
    const selectedId = dispatch(setSelectedNodeId(node.id))
    if (selectedId.payload !== currentSelectedNodeId && currentEditedNodeId)
      dispatch(setEditedNodeId(null))
  }

  const handleNodeDoubleClick = () => {
    dispatch(setEditedNodeId(node.id))
  }

  useEffect(() => {
    if (!currentEditedNodeId) setIsCancelledEditing(true)
    else setIsCancelledEditing(false)

    if (currentSelectedNodeId !== currentEditedNodeId)
      setIsCancelledEditing(true)
  }, [currentEditedNodeId, currentSelectedNodeId])

  return (
    <span
      style={StyleNodeElement}
      onClick={() => handleNodeClick()}
      onDoubleClick={() => handleNodeDoubleClick()}
    >
      <li style={StyleNodeElementLi}>
        {node.id === currentEditedNodeId && !isCancelledEditing ? (
          <NodeEditInput nodeId={node.id} />
        ) : (
          node.value
        )}
      </li>
    </span>
  )
}

export default NodeElement
