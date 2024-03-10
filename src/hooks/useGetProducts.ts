import { useQuery } from '@tanstack/react-query'

import { ProductService } from '../services/productsService'
import { QueryKeys } from '../consts'

import { IProduct } from '../types'

export const useGetProducts = (data: IProduct['id'][] = []) => {
	const response = useQuery({
		queryKey: [QueryKeys.products, data],
		queryFn: () => ProductService.getProducts(data || []),
		enabled: !!data[0],
		select: ({ data }) => data,
	})

	return { ...response, products: response.data?.result }
}
