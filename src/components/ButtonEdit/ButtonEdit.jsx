import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonStyles from '../buttonStyles'
import { setEditedNodeId } from '../../features/nodesSlice'

const ButtonEditStyle = styled.button`
  ${({ disabled }) => [...buttonStyles(disabled), 'width: 80px']}
`

function ButtonEdit({ disabled }) {
  const dispatch = useDispatch()
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )
  const currentEditedNodeId = useSelector(
    (state) => state.nodes.currentEditedNodeId
  )

  const handleEditClick = () => {
    if (currentSelectedNodeId) {
      dispatch(setEditedNodeId(currentSelectedNodeId))
    }
  }

  const handleCancelClick = () => {
    dispatch(setEditedNodeId(null))
  }

  return (
    <ButtonEditStyle
      disabled={disabled}
      onClick={!currentEditedNodeId ? handleEditClick : handleCancelClick}
    >
      {currentEditedNodeId ? 'Cancel' : 'Edit'}
    </ButtonEditStyle>
  )
}

export default ButtonEdit
