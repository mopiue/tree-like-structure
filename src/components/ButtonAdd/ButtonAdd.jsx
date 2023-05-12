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
  const currentSelectedNodeId = useSelector((state) => state.nodes.current.id)

  const handleAddClick = () => {
    dispatch(addNode(currentSelectedNodeId))
    notify({ type: 'success', message: 'Succefully added a new node' })
  }

  return (
    <ButtonAddStyle onClick={handleAddClick} disabled={disabled} id="test">
      Add
    </ButtonAddStyle>
  )
}

export default ButtonAdd
