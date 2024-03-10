import './App.css'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import { ProductService } from './services/productsService'
import { useGetProducts } from './hooks/useGetProducts'
import { QueryKeys, countProductOnPage as maxCountProductOnPage } from './consts'

import Pagination from 'rc-pagination'
import BtnToBottom from './components/BtnToBottom'
import ProductList from './components/ProductList'
import Filters from './components/Filters'
import { IProduct } from './types'

function App() {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageForQuery, setPageForQuery] = useState(1)
	const [idsData, setIdsData] = useState<IProduct['id'][]>([])
	const qc = useQueryClient()

	const { data, isError, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: [QueryKeys.productsId, pageForQuery],
		queryFn: ({ pageParam }) => {
			return pageParam > pageForQuery
				? ProductService.getProductsIdList({ offset: pageParam * maxCountProductOnPage })
				: ProductService.getProductsIdList({ offset: (pageForQuery - 1) * maxCountProductOnPage })
		},
		initialPageParam: 1,
		getNextPageParam: (_, allPages) => (allPages.length < pageForQuery ? pageForQuery + 1 : undefined),
		select: (response) => response.pages[0].data.result.filter((item, i, arr) => arr.indexOf(item) === i),
	})
	const { products, isError: isProductsFetchError, isLoading: isLoadingProducts } = useGetProducts(idsData)
	// Попробовать переделать запрос useGetProducts на useInfiniteQuery, чтобы работало вместе с prefetch

	useEffect(() => {
		if (hasNextPage) fetchNextPage()
	}, [fetchNextPage, hasNextPage])

	useEffect(() => {
		data?.[0] && setIdsData(data)
	}, [data])

	const postFilteredData = async (filter: Partial<IProduct>) => {
		const { data } = await qc.fetchQuery({
			queryKey: [QueryKeys.productsId],
			queryFn: () => ProductService.getFilteredProductsBy(filter),
			retry: true,
		})
		data && setIdsData(data.result)
	}

	const handleChangePage = (clickedPageNumber: number) => {
		if (hasNextPage) fetchNextPage()
		if (clickedPageNumber % 2 !== 0) setPageForQuery(clickedPageNumber)
		if (clickedPageNumber % 2 === 0) setPageForQuery(clickedPageNumber - 1)
		setCurrentPage(clickedPageNumber)
	}

	if (isError || isProductsFetchError) console.log(error?.message)

	return (
		<div>
			<Filters postFilteredData={postFilteredData} defaultValues={{}} />
			{isLoading || isLoadingProducts ? (
				<div className='wrapper__center'>Loading...</div>
			) : isError || isProductsFetchError ? (
				<div className='wrapper__center'>Ошибка при загрузке товаров</div>
			) : !products?.[0] ? (
				<div className='wrapper__center'>
					Нет товаров <a href=''>reload</a>
				</div>
			) : (
				<>
					<ProductList
						products={
							currentPage % 2 === 1
								? products.slice(0, maxCountProductOnPage)
								: products.slice(maxCountProductOnPage, Math.max(products.length, 60))
						}
					/>

					<Pagination
						className='pagination'
						pageSize={maxCountProductOnPage}
						total={161 * maxCountProductOnPage}
						defaultPageSize={maxCountProductOnPage}
						showLessItems={window.screen.width < 440 || false}
						prevIcon={<button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>}
						nextIcon={<button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>}
						jumpNextIcon={'...'}
						jumpPrevIcon={'...'}
						showPrevNextJumpers
						current={currentPage}
						onChange={handleChangePage}
					/>
				</>
			)}
			{createPortal(<BtnToBottom />, document.body)}
		</div>
	)
}

export default App
