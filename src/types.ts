export type IProduct = {
	brand: string | null
	id: string
	price: number
	product: string
}

export type TypeResponseApiGetIds = {
	result: IProduct['id'][]
}
export type TypeResponseApiGetItems = {
	result: IProduct[]
}

export enum enumApiAction {
	FILTER = 'filter',
	GET_IDS = 'get_ids',
	GET_ITEMS = 'get_items',
	GET_FIELDS = 'get_fields',
}

interface ICommonParams {
	limit?: number
	offset?: number
}

export type TypeRequestParams<T> = {
	action: enumApiAction
	params: T
}

export type TypeRequestGetIdsParams = TypeRequestParams<ICommonParams>
export type TypeRequestFilterParams = TypeRequestParams<Partial<IProduct>>
export type TypeRequestGetItemsParams = TypeRequestParams<
	{
		ids: IProduct['id'][]
	} & ICommonParams
>
