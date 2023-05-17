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
  width: 100%;
  height: 28px;
  background-color: white;
  outline: none;
  border: 1px solid #f1c40f;
  color: #f1c40f;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #f1c40f;
    color: white;
  }
`

function UndoRemove({ onUndo, message }) {
  return (
    <div style={StyleUndoRemove}>
      <span>{message}</span>
      <UndoButton onClick={onUndo}>Undo</UndoButton>
    </div>
  )
}

export default UndoRemove
