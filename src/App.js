import { ToastContainer } from 'react-toastify'

import NodeList from './components/NodeList/NodeList'
import ActionsPanel from './components/ActionsPanel/ActionsPanel'
import './index.css'
import { useRef } from 'react'

function App() {
  const inputEditRef = useRef(null)
  return (
    <div className="trees">
      <ToastContainer limit={2} />
      <span className="title">Tree</span>
      <NodeList inputEditRef={inputEditRef} />
      <ActionsPanel inputEditRef={inputEditRef} />
    </div>
  )
}

export default App
