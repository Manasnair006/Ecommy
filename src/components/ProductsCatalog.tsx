
import './ProductsCatalog.css'
interface Catalogprops{
    num:number
}

function generatecards(num: number){
    let htmlelem=[]
    for(let i= 0; i<num; i++){
        htmlelem.push(
        <div className='product-card'>
            Card {i}
        </div>
        )
    }
    return htmlelem
}

function ProductsCatalog({ num }:Catalogprops){
    return(
        <div className='catalog-container'>
            
            {
                generatecards(num)
            }
            
        </div>
    )
}
export default ProductsCatalog