import './ProductDisplayComponent.css'
import {getProductImage} from '../../public/products'

export default function ProductDisplayComponent({ id }:{ id: string}){
    const imageurl: string = getProductImage(id)
    console.log(imageurl)
    return (
        <div className='images'>
            <div className='product-image-container'>
                {imageurl==="null"? 'product not found!' : <img src={imageurl} /> }
            </div>
            <div className='images-container'>
                <img src={imageurl} className='product-images' />
                <img src={imageurl} className='product-images' />
                <img src={imageurl} className='product-images' />
                <img src={imageurl} className='product-images' />
                <img src={imageurl} className='product-images' />
                <img src={imageurl} className='product-images' />
            </div>
        </div>
        
    )
}