export type TypeProduct = {
	brand: string | null
	id: string
	price: number
	product: string
}

export type TypeApiGetIdsResponse = {
	result: TypeProduct['id'][]
}
export type TypeApiGetItemsResponse = {
	result: TypeProduct[]
}

export enum enumApiAction {
	FILTER = 'filter',
	GET_IDS = 'get_ids',
	GET_ITEMS = 'get_items',
	GET_FIELDS = 'get_fields',
}

export type TypeRequestParams = {
	action: enumApiAction
	params: object
}
