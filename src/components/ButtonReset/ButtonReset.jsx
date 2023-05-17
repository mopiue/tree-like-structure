import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import buttonsStyles from '../buttonsStyles'
import { resetNodes } from '../../features/nodesSlice'
import useNotify from '../../hooks/useNotify'

const ButtonResetStyle = styled.button`
  ${({ disabled }) => buttonsStyles(disabled)}
`

function ButtonReset({ disabled }) {
  const dispatch = useDispatch()
  const { notify } = useNotify()
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
