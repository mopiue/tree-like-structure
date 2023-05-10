import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonStyles from '../buttonStyles'
import { addNode } from '../../features/nodesSlice'
import notify from '../../helpers/notifications'

const ButtonAddStyle = styled.button`
  ${({ disabled }) => buttonStyles(disabled)}
`

function ButtonAdd({ disabled }) {
  const dispatch = useDispatch()
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )

  const handleAddClick = () => {
    try {
      dispatch(addNode(currentSelectedNodeId))
      notify({ type: 'success', message: 'Succefully added a new node' })
    } catch (error) {
      notify({ type: 'error', message: error.message })
    }
  }

  return (
    <ButtonAddStyle onClick={handleAddClick} disabled={disabled}>
      Add
    </ButtonAddStyle>
  )
}

export default ButtonAdd
