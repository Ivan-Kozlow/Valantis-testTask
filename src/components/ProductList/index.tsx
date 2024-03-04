import style from './ProductList.module.css'

import ProductItem from '../ProductItem'
import { IProduct } from '../../types'

const ProductList: React.FC<{ products: IProduct[] }> = ({ products }) => {
	return (
		<div className={style.items__list}>
			{products?.map((product) => (
				<ProductItem key={Math.random()} product={product} />
			))}
		</div>
	)
}

export default ProductList
