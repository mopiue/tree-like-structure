import { useSelector } from 'react-redux'
import ButtonAdd from '../ButtonAdd/ButtonAdd'
import ButtonEdit from '../ButtonEdit/ButtonEdit'
import ButtonRemove from '../ButtonRemove/ButtonRemove'
import ButtonReset from '../ButtonReset/ButtonReset'

import styles from './ActionsPanel.module.scss'
import { useEffect, useState } from 'react'

function ActionsPanel() {
  const currentSelectedNodeId = useSelector(
    (state) => state.nodes.currentSelectedNodeId
  )
  const nodes = useSelector((state) => state.nodes.nodes)
  const [buttonAddIsActive, setButtonAddIsActive] = useState(
    currentSelectedNodeId > 0 ? '' : 'disabled'
  )
  const [buttonResetIsActive, setButtonResetIsActive] = useState('')

  useEffect(() => {
    if (currentSelectedNodeId !== null || !nodes[0]) {
      setButtonAddIsActive('')
    } else {
      setButtonAddIsActive('disabled')
    }
  }, [currentSelectedNodeId, nodes])

  useEffect(() => {
    nodes.length > 0
      ? setButtonResetIsActive('')
      : setButtonResetIsActive('disabled')
  }, [nodes])

  // сделать оработку состояние для кнопки Reset
  return (
    <div className={styles.ActionsPanel}>
      <ButtonAdd disabled={buttonAddIsActive} />
      <ButtonRemove disabled={currentSelectedNodeId ? '' : 'disabled'} />
      <ButtonEdit disabled={''} />
      <ButtonReset disabled={buttonResetIsActive} />
    </div>
  )
}

export default ActionsPanel
