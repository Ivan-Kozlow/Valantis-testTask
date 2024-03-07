import './App.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ProductService } from './services/productsService'
import { QueryKeys, countProductOnPage } from './consts'

import Pagination from 'rc-pagination'
import BtnToBottom from './components/BtnToBottom'
import ProductList from './components/ProductList'

// TODO Filter => возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду

function App() {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageForQuery, setPageForQuery] = useState(1)

	const { data, isError, error } = useQuery({
		queryKey: [QueryKeys.productsId, pageForQuery],
		queryFn: () => ProductService.getProductsIdList({ offset: (pageForQuery - 1) * countProductOnPage }),
		select: ({ data }) => data.result.filter((item, i, arr) => arr.indexOf(item) === i),
	})

	const { data: products, isError: isProductsFetchError } = useQuery({
		queryKey: [QueryKeys.products, data],
		queryFn: () => ProductService.getProducts(data || []),
		enabled: !!data,
		select: ({ data }) => data,
	})

	const handleClickNextPage = (clickedPageNumber: number) => {
		if (clickedPageNumber % 2 !== 0) setPageForQuery(clickedPageNumber)
		if (clickedPageNumber % 2 === 0) setPageForQuery(clickedPageNumber - 1)
		setCurrentPage(clickedPageNumber)
	}

	if (isError || isProductsFetchError) {
		console.log(error?.message)
		return <div className='wrapper__center'>Ошибка при загрузке товаров</div>
	}
	if (!products) {
		return <div className='wrapper__center'>Loading...</div>
	}

	return (
		<div>
			<ProductList
				products={
					currentPage % 2 === 1
						? products.result.slice(0, countProductOnPage)
						: products.result.slice(countProductOnPage, products.result.length)
				}
			/>
			<BtnToBottom />
			<Pagination
				className='pagination'
				pageSize={countProductOnPage}
				total={333}
				defaultPageSize={50}
				showLessItems={window.screen.width < 440 || false}
				prevIcon={<button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>}
				nextIcon={<button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>}
				jumpNextIcon={'...'}
				jumpPrevIcon={'...'}
				showPrevNextJumpers
				current={currentPage}
				onChange={handleClickNextPage}
			/>
		</div>
	)
}

export default App
