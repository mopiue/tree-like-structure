import styled from 'styled-components'

const StyleUndoRemove = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const UndoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 28px;
  background-color: white;
  outline: none;
  border: none;
  border: 1px solid rgba(20, 198, 58);
  color: rgba(20, 198, 58);
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: rgba(20, 198, 58);
    color: white;
  }
`

function UndoRemove({ onUndo, message, id }) {
  return (
    <div style={StyleUndoRemove}>
      <span>{message}</span>
      <UndoButton onClick={onUndo}>Undo</UndoButton>
    </div>
  )
}

export default UndoRemove
