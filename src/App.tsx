import './App.css'
import { useQuery } from '@tanstack/react-query'

import { ProductService } from './services/productsService'
import { queriesKeys } from './consts'

import ProductItem from './components/ProductItem'

function App() {
	const { data, isError: idListFetchError } = useQuery({
		queryKey: [queriesKeys.productsId],
		queryFn: () => ProductService.getProductsIdList(),
	})

	const { data: products, isError: productsFetchError } = useQuery({
		queryKey: [queriesKeys.products, data?.result],
		queryFn: () => ProductService.getProducts(data?.result || []),
	})

	if (idListFetchError || productsFetchError) {
		return <div>Ошибка при загрузке товаров</div>
	}

	if (!products?.result[0]) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{products?.result?.map((product) => (
				<ProductItem key={product.id} product={product} />
			))}
		</div>
	)
}

export default App
