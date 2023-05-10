import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = ({ type, message }) => {
  return toast(message, {
    type,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 700,
  })
}

export default notify
