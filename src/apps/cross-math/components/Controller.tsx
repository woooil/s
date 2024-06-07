import classNames from 'classnames'
import '../styles/Controller.scss'
import { ReactNode } from 'react'

interface ControllerProps {
  className: string
  buttonName: string
  handler: () => void
  children?: ReactNode
}

export default function Controller({
  className,
  buttonName,
  handler,
  children,
}: ControllerProps) {
  return (
    <button
      className={classNames(
        className,
        { button: className !== 'create' },
        'm-icon',
      )}
      onClick={handler}>
      {buttonName}
      {children}
    </button>
  )
}
