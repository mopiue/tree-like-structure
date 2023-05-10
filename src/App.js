import NodeList from './components/NodeList/NodeList'
import ActionsPanel from './components/ActionsPanel/ActionsPanel'
import { ToastContainer } from 'react-toastify'
import './index.css'

function App() {
  return (
    <div className="trees">
      <ToastContainer limit={2} />
      <span className="title">Tree</span>
      <NodeList />
      <ActionsPanel />
    </div>
  )
}

export default App
