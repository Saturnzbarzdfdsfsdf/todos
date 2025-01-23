import React, { useState } from 'react'

import { Button, EditableSpan } from '../../shared/ui'

import styles from './index.module.css'

interface ITodo {
	id: number
	title: string
	completed: boolean
}
export const TodoPage: React.FC = () => {
	const [todos, setTodos] = useState<ITodo[]>([])
	const [inputValue, setInputValue] = useState<string>('')
	const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

	const addTodo = () => {
		if (inputValue.trim() === '') return

		const newTodo: ITodo = {
			id: Date.now(),
			title: inputValue,
			completed: false,
		}

		setTodos([...todos, newTodo])
		setInputValue('')
	}

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			addTodo()
		}
	}

	const removeTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const onToggleCompletion = (id: number) => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		)
	}

	const removeCompleted = () => {
		setTodos(todos.filter(todo => !todo.completed))
	}

	const filteredTodos = todos.filter(todo => {
		if (filter === 'active') return !todo.completed
		if (filter === 'completed') return todo.completed
		return true
	})

	const onUpdateIdeaTitle = (newTitle: string, todoListsId: number) => {
		const updatedTodoLists = todos.map(tl =>
			tl.id === todoListsId ? { ...tl, title: newTitle } : tl
		)
		setTodos(updatedTodoLists)
	}

	return (
		<div className={styles.container}>
			<h1>Todo List</h1>

			<div className={styles.fs}>
				<input
					className={styles.input}
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={handleKeyUp}
					placeholder='what needs to be done'
				/>

				<Button className={styles.btnAdd} onClick={addTodo}>
					add
				</Button>
			</div>

			<ul>
				{filteredTodos.map(todo => (
					<li className={styles.todoList} key={todo.id}>
						<input
							className={styles.inputCheckBox}
							type='checkbox'
							checked={todo.completed}
							onChange={() => onToggleCompletion(todo.id)}
						/>

						<EditableSpan
							completed={todo.completed}
							onToggleCompletion={() => onToggleCompletion(todo.id)}
							onChangeSpanTitle={newTitle =>
								onUpdateIdeaTitle(newTitle, todo.id)
							}
							title={todo.title}
						/>

						<Button
							className={styles.btnDelete}
							onClick={() => removeTodo(todo.id)}
						>
							Delete
						</Button>
					</li>
				))}
			</ul>

			<div className={styles.btnBox}>
				<p>tasks left: {todos.filter(todo => !todo.completed).length}</p>
				<div>
					<Button
						className={`${styles.btnFilter} ${
							filter === 'all' ? styles.active : ''
						}`}
						onClick={() => setFilter('all')}
					>
						All
					</Button>

					<Button
						className={`${styles.btnFilter} ${
							filter === 'active' ? styles.active : ''
						}`}
						onClick={() => setFilter('active')}
					>
						Active
					</Button>

					<Button
						className={`${styles.btnFilter} ${
							filter === 'completed' ? styles.active : ''
						}`}
						onClick={() => setFilter('completed')}
					>
						Completed
					</Button>
				</div>

				<Button className={styles.btnClear} onClick={removeCompleted}>
					Clear completed
				</Button>
			</div>
		</div>
	)
}
