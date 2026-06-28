import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CartComponent from './components/CartComponent'
import ProductsPage from './ProductsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='parent'>
      <ProductsPage />
      <CartComponent /> 
    </div>
  </StrictMode>,
)
