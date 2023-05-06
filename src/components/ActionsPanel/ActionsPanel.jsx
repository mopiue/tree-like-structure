import ButtonAdd from '../ButtonAdd/ButtonAdd'
import ButtonEdit from '../ButtonEdit/ButtonEdit'
import ButtonRemove from '../ButtonEdit/ButtonEdit'
import ButtonReset from '../ButtonReset/ButtonReset'

import styles from './ActionsPanel.module.scss'

function ActionsPanel() {
  return (
    <div className={styles.ActionsPanel}>
      <ButtonAdd />
      <ButtonRemove />
      <ButtonEdit />
      <ButtonReset />
    </div>
  )
}

export default ActionsPanel
