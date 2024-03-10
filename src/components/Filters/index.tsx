import style from './Filters.module.scss'
import { useEffect, useRef, useState } from 'react'

import debounce from 'debounce'
import { IProduct } from '../../types'

type TypeProps = {
	postFilteredData: (filter: Partial<IProduct>) => void
	defaultValues?: Partial<IProduct>
}

const Filters: React.FC<TypeProps> = ({ postFilteredData }) => {
	const inputGroupRef = useRef<HTMLDivElement>(null)
	const [isActive, setIsActive] = useState<boolean>(true)
	const defaultInputValuesRef = useRef({})

	useEffect(() => {
		if (isActive) inputGroupRef.current?.classList.add(style.active)
		else inputGroupRef.current?.classList.remove(style.active)

		return () => {
			defaultInputValuesRef.current = {}
		}
	}, [isActive])

	const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const filters = { [e.target.name]: e.target.value }
		postFilteredData(filters)
		defaultInputValuesRef.current = { ...defaultInputValuesRef.current, [e.target.name]: e.target.value }
	}, 600)

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div className={style.header}>
				<h2>Search for items</h2>
				<button type='button' onClick={() => setIsActive(!isActive)}>
					{isActive ? 'Скрыть' : 'Показать'} фильтры
				</button>
			</div>

			<div ref={inputGroupRef} className={`${style.input__group} ${isActive ? style.active : ''}`}>
				<input type='text' name='id' placeholder='ID' onChange={handleInputChange} />
				<input type='text' name='product' placeholder='Product name' onChange={handleInputChange} />
				<input type='text' name='brand' placeholder='Brand' onChange={handleInputChange} />
				<input type='number' name='price' placeholder='Price' onChange={handleInputChange} />
			</div>
		</form>
	)
}

export default Filters
