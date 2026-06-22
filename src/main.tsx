import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductPage from './components/ProductPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductPage 
        id= '002'
      />
  </StrictMode>,
)
