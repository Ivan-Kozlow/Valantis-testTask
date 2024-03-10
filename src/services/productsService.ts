import axios from '../axios'
import { AxiosResponse } from 'axios'

import {
	IProduct,
	TypeRequestFilterParams,
	TypeRequestGetIdsParams,
	TypeRequestGetItemsParams,
	TypeResponseApiGetIds,
	TypeResponseApiGetItems,
	enumApiAction,
} from '../types'

export const ProductService = {
	getProductsIdList: async ({ limit = 100, offset = 0 }) => {
		return await axios.post<TypeResponseApiGetIds, AxiosResponse<TypeResponseApiGetIds>, TypeRequestGetIdsParams>(
			'/',
			{
				action: enumApiAction.GET_IDS,
				params: { limit, offset },
			}
		)
	},

	getProducts: async (idList: IProduct['id'][]) => {
		return await axios.post<
			TypeResponseApiGetItems,
			AxiosResponse<TypeResponseApiGetItems>,
			TypeRequestGetItemsParams
		>('/', {
			action: enumApiAction.GET_ITEMS,
			params: { ids: idList },
		})
	},

	getFilteredProductsBy: async (filter: Partial<IProduct>) => {
		filter.price = Number(filter.price)

		return await axios.post<TypeResponseApiGetIds, AxiosResponse<TypeResponseApiGetIds>, TypeRequestFilterParams>(
			'/',
			{
				action: enumApiAction.FILTER,
				params: filter,
			}
		)
	},
}
