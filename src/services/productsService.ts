import axios from '../axios'
import { AxiosResponse } from 'axios'

import { TypeApiGetIdsResponse, TypeApiGetItemsResponse, TypeProduct, TypeRequestParams, enumApiAction } from '../types'

export const ProductService = {
	getProductsIdList: async (limit = 50, offset = 0) => {
		return (
			await axios.post<TypeApiGetIdsResponse, AxiosResponse<TypeApiGetIdsResponse>, TypeRequestParams>('/', {
				action: enumApiAction.GET_IDS,
				params: { limit, offset },
			})
		).data
	},

	getProducts: async (idList: TypeProduct['id'][]) => {
		return (
			await axios.post<TypeApiGetItemsResponse, AxiosResponse<TypeApiGetItemsResponse>, TypeRequestParams>('/', {
				action: enumApiAction.GET_ITEMS,
				params: { ids: idList },
			})
		).data
	},
}
