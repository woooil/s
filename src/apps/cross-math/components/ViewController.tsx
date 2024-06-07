import Controller from './Controller'
import '../styles/ViewController.scss'

interface ViewControllerProps {
  printHandler: () => void
  answerHandler: () => void
  showAns: boolean
}

export default function ViewController({
  printHandler,
  answerHandler,
  showAns,
}: ViewControllerProps) {
  return (
    <div className="view-controller">
      <Controller
        className="print"
        buttonName="print"
        handler={printHandler}
      />
      <Controller
        className="show-ans"
        buttonName={showAns ? 'visibility' : 'visibility_off'}
        handler={answerHandler}
      />
    </div>
  )
}
