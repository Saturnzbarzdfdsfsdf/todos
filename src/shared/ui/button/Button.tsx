import { FC } from "react"

interface IButtonProps {
	onClick: () => void
	children: React.ReactNode
	className?: string
}

const Button: FC<IButtonProps> = props => {
	const { onClick, className, children } = props

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button