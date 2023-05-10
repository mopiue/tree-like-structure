import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import buttonStyles from '../buttonStyles'
import { resetNodes } from '../../features/nodesSlice'

const ButtonResetStyle = styled.button`
  ${({ disabled }) => buttonStyles(disabled)}
`

function ButtonReset({ disabled }) {
  const dispatch = useDispatch()

  const handleResetClick = () => {
    dispatch(resetNodes())
  }

  return (
    <ButtonResetStyle onClick={handleResetClick} disabled={disabled}>
      Reset
    </ButtonResetStyle>
  )
}

export default ButtonReset
