import './ProductsPage.css'
import NavBar from './components/NavBar'
import ProductsCatalog from './components/ProductsCatalog'

function ProductsPage(){
    return(
        <div className='products-page-container'>
            <NavBar />
            <ProductsCatalog num={50}/>
        </div>
    )
}
export default ProductsPage