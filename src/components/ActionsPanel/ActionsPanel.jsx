import { useSelector } from 'react-redux'
import ButtonAdd from '../ButtonAdd/ButtonAdd'
import ButtonEdit from '../ButtonEdit/ButtonEdit'
import ButtonRemove from '../ButtonRemove/ButtonRemove'
import ButtonReset from '../ButtonReset/ButtonReset'

import styles from './ActionsPanel.module.scss'
import { useEffect, useState } from 'react'

function ActionsPanel() {
  const currentSelectedNodeId = useSelector((state) => state.nodes.current.id)
  const nodes = useSelector((state) => state.nodes.nodes)

  const [buttonAddIsActive, setButtonAddIsActive] = useState(
    currentSelectedNodeId > 0 ? '' : 'disabled'
  )
  const [buttonRemoveIsActive, setButtonRemoveIsActive] = useState('')
  const [buttonEditIsActive, setButtonEditIsActive] = useState('')
  const [buttonResetIsActive, setButtonResetIsActive] = useState('')

  useEffect(() => {
    if (currentSelectedNodeId !== null || !nodes[0]) setButtonAddIsActive('')
    else setButtonAddIsActive('disabled')
  }, [currentSelectedNodeId, nodes])

  useEffect(() => {
    nodes.length > 0
      ? setButtonResetIsActive('')
      : setButtonResetIsActive('disabled')
  }, [nodes])

  useEffect(() => {
    if (currentSelectedNodeId) {
      setButtonRemoveIsActive('')
      setButtonEditIsActive('')
    } else {
      setButtonRemoveIsActive('disabled')
      setButtonEditIsActive('disabled')
    }
  }, [currentSelectedNodeId])

  return (
    <div className={styles.ActionsPanel}>
      <ButtonAdd disabled={buttonAddIsActive} />
      <ButtonRemove disabled={buttonRemoveIsActive} />
      <ButtonEdit disabled={buttonEditIsActive} />
      <ButtonReset disabled={buttonResetIsActive} />
    </div>
  )
}

export default ActionsPanel
