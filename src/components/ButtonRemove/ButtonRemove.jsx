import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonsStyles from '../buttonsStyles'
import { removeNode } from '../../features/nodesSlice'
import useNotify from '../../hooks/useNotify'

const ButtonRemoveStyle = styled.button`
  ${({ disabled }) => buttonsStyles(disabled)}
`

function ButtonRemove({ disabled }) {
  const dispatch = useDispatch()
  const { notify } = useNotify()
  const currentSelectedNodeId = useSelector((state) => state.nodes.current.id)
  const currentNodeValue = useSelector((state) => state.nodes.current.value)

  const handleRemoveClick = () => {
    if (currentSelectedNodeId) {
      dispatch(removeNode(currentSelectedNodeId))

      notify({
        id: currentSelectedNodeId,
        type: 'warning',
        purpose: 'remove',
        message: `${currentNodeValue} will be deleted`,
      })
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
