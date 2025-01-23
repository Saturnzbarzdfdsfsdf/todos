import { FC, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'

import styles from './index.module.css'

type TEditableSpan = {
	title: string
	completed?: boolean
	onToggleCompletion?: () => void
	onChangeSpanTitle: (newTitle: string) => void
}

const EditableSpan: FC<TEditableSpan> = ({
	onChangeSpanTitle,
	title,
	completed,
	onToggleCompletion,
}) => {
	const [spanTitle, setSpanTitle] = useState(title)

	const [isEditing, setIsEditing] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSpanTitle(e.currentTarget.value)
	}

	useEffect(() => {
		setSpanTitle(title)
	}, [title])

	const activeEditMode = () => {
		setSpanTitle(title)
		setIsEditing(true)
	}

	const handleBlurOrEnter = () => {
		setIsEditing(false)
		onChangeSpanTitle(spanTitle)
	}

	const handleDoubleClick = () => {
		setIsEditing(true)
	}

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			handleBlurOrEnter()
		}
	}

	return isEditing ? (
		<input
			className={styles.editableInput}
			value={spanTitle}
			onDoubleClick={handleDoubleClick}
			onKeyUp={handleKeyUp}
			onChange={handleChange}
			onBlur={handleBlurOrEnter}
			autoFocus
		/>
	) : (
		<span
			onClick={onToggleCompletion}
			className={`${completed ? styles.completed : ''}`}
			onDoubleClick={activeEditMode}
		>
			{spanTitle}
		</span>
	)
}

export default EditableSpan
