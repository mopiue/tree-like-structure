import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonStyles from '../buttonStyles'
import { editNode } from '../../features/nodesSlice'

const ButtonEditStyle = styled.button`
  ${({ disabled }) => buttonStyles(disabled)}
`

function ButtonEdit({ disabled }) {
  const dispatch = useDispatch()
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )

  const handleEditClick = () => {
    if (currentSelectedNodeId) {
      try {
        dispatch(editNode(currentSelectedNodeId))
      } catch (error) {}
    }
  }

  return (
    <ButtonEditStyle disabled={disabled} onClick={handleEditClick}>
      Edit
    </ButtonEditStyle>
  )
}

export default ButtonEdit
