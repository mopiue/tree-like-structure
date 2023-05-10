import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonStyles from '../buttonStyles'
import notify from '../../helpers/notifications'
import { removeNode } from '../../features/nodesSlice'

const ButtonRemoveStyle = styled.button`
  ${({ disabled }) => buttonStyles(disabled)}
`

function ButtonRemove({ disabled }) {
  const dispatch = useDispatch()
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )

  const handleRemoveClick = () => {
    if (currentSelectedNodeId) {
      dispatch(removeNode(currentSelectedNodeId))
      notify({ type: 'success', message: 'Node was successfully removed' })
    }
  }

  return (
    <>
      <ButtonRemoveStyle disabled={disabled} onClick={handleRemoveClick}>
        Remove
      </ButtonRemoveStyle>
    </>
  )
}

export default ButtonRemove
