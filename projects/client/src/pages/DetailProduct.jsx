import React, { useEffect } from 'react'
import { getProductById } from '../features/product/productSlice'
import { currency } from "../helpers/currency";
import { addProductToCart } from "../features/cart/cartSlice";
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function DetailProduct() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector((state) => state.products.product);

    useEffect(() => {
        dispatch(getProductById(productId))
    }, [])

    return (
        <div className='grid grid-cols-2 justify-center p-14'>
            <div className='p-8'>
                {/* image */}
                <img className=' w-72 mx-48 '
                    src=
                    {`${process.env.REACT_APP_API_BE}/uploads/${product.product_image}`}
                    borderRadius='lg'
                    alt="image not found" />
            </div>
            <div className=' mt-7 shadow-card-tagline border-y-2 w-full max-w-xs flex flex-col p-2'>
                <div className='p-4' >
                    {/* product name */}
                    <div className='text-xl font-extrabold'>{product.name}</div>
                    {/* description */}
                    <div className='mt-4 text-sm font-medium'>{product.description}</div>
                    {/* Stock */}
                    <div className='mt-2 text-sm font-medium'>Stock : {product.stock}</div>
                    {/* Category */}
                    <div className='mt-2 text-sm font-medium'>Category : {product.category?.name || '-'}</div>
                    {/* Price */}
                    <div className='mt-2 text-sm font-medium'>
                        {currency(product.price)}
                    </div>
                </div>
                <Button className='button-primary mt-14 mb-1' variant={'solid'} size={'sm'}
                    onClick={() => navigate("/cart", dispatch(addProductToCart(product)))}>
                    Add to Cart
                </Button>
            </div>
        </div >
    )
}

export default DetailProduct