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
    height: '30px',
    paddingLeft: '10px',
    fontSize: '16px',
    border: 'none',
    backgroundColor: '#cbf9d5',
    outline: 'none',
    color: 'rgb(20, 198, 58)',
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
          setInputEditValue('')
          return
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
