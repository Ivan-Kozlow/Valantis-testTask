import './App.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { ProductService } from './services/productsService'
import { queriesKeys } from './consts'

import Pagination from 'rc-pagination'
import BtnToBottom from './components/BtnToBottom'
import ProductList from './components/ProductList'

// TODO Pagination
// TODO Filter

function App() {
	const [currentPage, setCurrentPage] = useState(1)

	const { data, isError: idListFetchError } = useQuery({
		queryKey: [queriesKeys.productsId, currentPage],
		queryFn: () => ProductService.getProductsIdList({ offset: currentPage }),
	})

	const { data: products, isError: productsFetchError } = useQuery({
		queryKey: [queriesKeys.products, data?.result],
		queryFn: () => ProductService.getProducts(data?.result || []),
		enabled: !!data?.result,
	})

	// const { data: filteredData } = useQuery({
	// 	queryKey: [queriesKeys.products, 50000],
	// 	queryFn: () => ProductService.getFilteredProductsBy({ price: 50000 }),
	// })
	// console.log(filteredData)

	if (idListFetchError || productsFetchError) {
		return <div className='wrapper__center'>Ошибка при загрузке товаров</div>
	}
	if (!products?.result) {
		return <div className='wrapper__center'>Loading...</div>
	}

	return (
		<div>
			<ProductList products={products.result} />
			<BtnToBottom />
			<Pagination
				className='pagination'
				pageSize={products.result.length}
				total={888} //FIXME	поиграться с pagination
				showLessItems={window.screen.width < 440 || false}
				prevIcon={<button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>}
				nextIcon={<button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>}
				jumpNextIcon={'...'}
				jumpPrevIcon={'...'}
				pageSizeOptions={[]}
				current={currentPage}
				onChange={(pageNumber) => setCurrentPage(pageNumber)}
			/>
		</div>
	)
}

export default App
