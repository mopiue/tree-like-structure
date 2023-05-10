import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveEditedNode } from '../../features/nodesSlice'
import notify from '../../helpers/notifications'

function NodeEditInput({ nodeId }) {
  const dispatch = useDispatch()
  const [inputEditValue, setInputEditValue] = useState('')
  const inputEditRef = useRef(null)

  const StyleInputEdit = {
    width: '200px',
    border: 'none',
    backgroundColor: '#cbf9d5',
    height: '30px',
    outline: 'none',
    paddingLeft: '10px',
    color: 'rgb(20, 198, 58)',
    fontSize: '16px',
  }

  const handleNodeEditInputClick = (event) => {
    event.stopPropagation()
  }

  const handleEnterPress = (event) => {
    try {
      if (event.key === 'Enter') {
        if (event.target.value.trim().length > 10) {
          notify({
            type: 'warning',
            message: 'The node name must not contain more than 10 characters',
          })
          return false
        }

        const result = dispatch(
          saveEditedNode({ id: nodeId, value: event.target.value })
        )

        if (result.payload)
          notify({ type: 'success', message: 'Node was succesfully edited' })
      }
    } catch (error) {
      notify({ type: 'error', message: error.message })
    }
  }

  const handleInputChange = (event) => {
    setInputEditValue(event.target.value)
  }

  useEffect(() => {
    if (inputEditRef.current) inputEditRef.current.focus()
  }, [inputEditRef])

  return (
    <input
      type="text"
      ref={inputEditRef}
      style={StyleInputEdit}
      value={inputEditValue}
      onChange={handleInputChange}
      onKeyDown={handleEnterPress}
      onClick={handleNodeEditInputClick}
    />
  )
}

export default NodeEditInput
