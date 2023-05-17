import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UndoRemove from '../components/UndoRemove/UndoRemove'
import { undoRemove } from '../features/nodesSlice'
import { useDispatch } from 'react-redux'
import { cleanNodes } from '../features/nodesSlice'

const useNotify = () => {
  const dispatch = useDispatch()

  const handleUndoRemove = (id) => {
    dispatch(undoRemove(id))
  }

  const notify = ({ id, type, purpose, message }) => {
    return toast(
      purpose === 'remove' ? (
        <UndoRemove onUndo={() => handleUndoRemove(id)} message={message} />
      ) : (
        message
      ),
      {
        type,
        position: toast.POSITION.TOP_CENTER,
        autoClose: type === 'warning' || type === 'error' ? 5000 : 500,
        onClose: () => {
          if (purpose === 'remove') dispatch(cleanNodes())
        },
      }
    )
  }

  return { notify }
}

export default useNotify
