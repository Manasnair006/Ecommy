
import './ProductPage.css'
import NavBar from './NavBar';

import ProductDisplayComponent from './ProductDisplayComponent';

export default function ProductPage({id}:{id: string}){
    return(
        <div className='product-page'>
            <NavBar />
            <ProductDisplayComponent id={id}/>  
        </div>
    )
}