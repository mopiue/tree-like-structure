import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = ({ id, type, message }) => {
  return toast(message, {
    type,
    position: toast.POSITION.TOP_CENTER,
    autoClose: type === 'warning' || type === 'error' ? 3000 : 700,
    onClose: () => {
      console.log('toast closed')
    },
  })
}

export default notify
