import ProductDisplayComponent from './ProductDisplayComponent';
import ProductDetails from './ProductDetails';
import ProductPriceDetails from './ProductPriceDetails';

export default function ProductPage({id}:{id: string}){
    return(
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 pb-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)_minmax(280px,360px)] lg:px-6">
            <ProductDisplayComponent id={id}/>  
            <ProductDetails />
            <ProductPriceDetails />
        </div>
    )
}
