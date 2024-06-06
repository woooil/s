import Controller from './Controller'
import '../styles/MainController.scss'

interface MainControllerProps {
  undoHandler: () => void
  clickHandler: () => void
  redoHandler: () => void
}

export default function MainController({
  undoHandler,
  clickHandler,
  redoHandler,
}: MainControllerProps) {
  return (
    <div className="main-controller">
      <Controller
        className="undo"
        buttonName="undo"
        handler={undoHandler}
      />
      <Controller
        className="create"
        buttonName="deployed_code"
        handler={clickHandler}
      />
      <Controller
        className="redo"
        buttonName="redo"
        handler={redoHandler}
      />
    </div>
  )
}
