import { ToastContainer } from 'react-toastify'

import NodeList from './components/NodeList/NodeList'
import ActionsPanel from './components/ActionsPanel/ActionsPanel'

import './index.css'
function App() {
  return (
    <div className="tree">
      <ToastContainer limit={5} />
      <span className="title">Tree</span>
      <NodeList />
      <ActionsPanel />
    </div>
  )
}

export default App
