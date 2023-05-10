import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import buttonStyles from '../buttonStyles'
import { resetNodes } from '../../features/nodesSlice'
import notify from '../../helpers/notifications'

const ButtonResetStyle = styled.button`
  ${({ disabled }) => buttonStyles(disabled)}
`

function ButtonReset({ disabled }) {
  const dispatch = useDispatch()
  const nodes = useSelector((state) => state.nodes.nodes)

  const handleResetClick = () => {
    if (nodes.length > 0) {
      dispatch(resetNodes())
      notify({ type: 'success', message: 'Nodes were successfully reset' })
    }
  }

  return (
    <ButtonResetStyle onClick={handleResetClick} disabled={disabled}>
      Reset
    </ButtonResetStyle>
  )
}

export default ButtonReset
