import './ProductsPage.css'
import NavBar from './components/NavBar'
import ProductPage from './components/ProductPage'

function ProductsPage(){
    return(
        <div className='products-page-container'>
            <NavBar />
            <ProductPage 
                id= '002' />
        </div>
    )
}
export default ProductsPage