import { useDispatch, useSelector } from 'react-redux'

import { addNode } from '../../features/nodesSlice'
import buttonsStyles from '../buttonsStyles'
import useNotify from '../../hooks/useNotify'
import styled from 'styled-components'

const ButtonAddStyle = styled.button`
  ${({ disabled }) => buttonsStyles(disabled)}
`

function ButtonAdd({ disabled }) {
  const dispatch = useDispatch()
  const currentSelectedNodeId = useSelector((state) => state.nodes.current.id)
  const { notify } = useNotify()

  const handleAddClick = () => {
    dispatch(addNode(currentSelectedNodeId))
    notify({
      type: 'success',
      message: `Successfully added a new node`,
    })
  }

  return (
    <ButtonAddStyle onClick={handleAddClick} disabled={disabled} id="test">
      Add
    </ButtonAddStyle>
  )
}

export default ButtonAdd
