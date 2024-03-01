import { TypeProduct } from '../types'

type TypeProps = {
	product: TypeProduct
}

const ProductItem: React.FC<TypeProps> = ({ product }) => {
	return <div>{product.product}</div>
}

export default ProductItem
