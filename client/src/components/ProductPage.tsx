import './styles/ProductPage.css'
import ProductDisplayComponent from './ProductDisplayComponent';
import ProductDetails from './ProductDetails';
import ProductPriceDetails from './ProductPriceDetails';

export default function ProductPage({id}:{id: string}){
    return(
        <div className='product-page'>
            <ProductDisplayComponent id={id}/>  
            <ProductDetails />
            <ProductPriceDetails />
        </div>
    )
}