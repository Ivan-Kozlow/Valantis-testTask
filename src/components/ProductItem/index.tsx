import style from './ProductItem.module.css'

import { IProduct } from '../../types'

type TypeProps = {
	product: IProduct
}

const ProductItem: React.FC<TypeProps> = ({ product }) => {
	return (
		<div className={style.item}>
			<h2>
				<b>{product.product}</b>
			</h2>
			<div className={style.info}>
				<p>
					<b>Brand:</b> {product.brand || 'no brand'}
				</p>
				<p>
					<b>Price:</b> {product.price} руб.
				</p>
			</div>
			<p className={style.id}>ID: {product.id}</p>
		</div>
	)
}

export default ProductItem
