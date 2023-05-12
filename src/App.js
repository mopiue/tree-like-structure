import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { setEditedNodeId } from './features/nodesSlice'
import NodeList from './components/NodeList/NodeList'
import ActionsPanel from './components/ActionsPanel/ActionsPanel'

import './index.css'

function App() {
  const dispatch = useDispatch()
  const currentEditedNodeId = useSelector(
    (state) => state.nodes.currentEditedNodeId
  )

  const body = document.querySelector('body')

  const handleOutsideClick = () => {
    if (currentEditedNodeId) {
      dispatch(setEditedNodeId(null))
    }
  }

  body.addEventListener('click', () => {
    handleOutsideClick()
  })

  return (
    <div className="tree" onClick={handleOutsideClick}>
      <ToastContainer limit={2} />
      <span className="title">Tree</span>
      <NodeList />
      <ActionsPanel />
    </div>
  )
}

export default App
