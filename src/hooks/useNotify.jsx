import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UndoRemove from '../components/UndoRemove/UndoRemove'
import { setActiveNodeId, undoRemove } from '../features/nodesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cleanNodes } from '../features/nodesSlice'

const useNotify = () => {
  const dispatch = useDispatch()
  const toRemove = useSelector((state) => state.nodes.toRemove)

  const handleUndoRemove = (id) => {
    if (!toRemove.includes(1)) {
      dispatch(undoRemove(id))
      dispatch(setActiveNodeId(id))
    }
  }

  const notify = ({ id, type, message }) => {
    return toast(
      <UndoRemove
        onUndo={() => handleUndoRemove(id)}
        message={message}
        id={id}
      />,
      {
        type,
        position: toast.POSITION.TOP_CENTER,
        autoClose: type === 'warning' || type === 'error' ? 3000 : 3000,
        onClose: () => {
          dispatch(cleanNodes())
        },
      }
    )
  }

  return { notify }
}

export default useNotify
