import style from './BtnToBottom.module.css'
import React, { useEffect, useRef, useState } from 'react'

const BtnToBottom: React.FC = () => {
	const btnRef = useRef<HTMLButtonElement>(null)
	const [showButton, setShowButton] = useState(true)

	useEffect(() => {
		function handleShowButton() {
			if (window.innerHeight + window.scrollY <= document.body.scrollHeight - 120) {
				setShowButton(true)
			} else setShowButton(false)
		}

		window.addEventListener('scroll', handleShowButton)
		return () => {
			window.removeEventListener('scroll', handleShowButton)
		}
	}, [])

	const scrollToBottom = () => {
		window.scrollTo(0, document.body.scrollHeight)
	}

	return (
		<button
			ref={btnRef}
			type='button'
			onClick={scrollToBottom}
			className={`${style.btn} ${showButton ? '' : style.hide}`}
		>
			Вниз
		</button>
	)
}

export default BtnToBottom
