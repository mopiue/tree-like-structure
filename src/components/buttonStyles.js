import { css } from 'styled-components'

export const buttonStyles = (disabled) => css`
  ${disabled !== 'disabled' && {
    color: 'rgba(20, 198, 58)',
    border: '1px solid rgba(20, 198, 58)',
    '&:hover': {
      backgroundColor: 'rgba(20, 198, 58)',
      color: 'white',
    },
  }}
  ${disabled === 'disabled' && {
    color: '#c0c0c0',
    border: '1px solid #c0c0c0',
    cursor: 'not-allowed',
  }}
`

export default buttonStyles
