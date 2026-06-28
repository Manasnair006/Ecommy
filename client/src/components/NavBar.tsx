import "./styles/NavBar.css"
import sandwichicon from '../assets/sandwichbar.png'
import searchicon from '../assets/search.png'

function NavBar(){
    return(
        <div className="navbar">
            <img src={sandwichicon} className="sandwichicon"/>
            <div className="sitename">
                ECOMMY
            </div>
            <div className="quick-access">
                <div>
                    Products
                </div>
                <div>
                    Cart
                </div>
                <div>
                    Offers
                </div>
                <div>
                    About us
                </div>
            </div>
            <div className="search-input">
                <input 
                    type="text"
                    placeholder="Search" />
                <img src={searchicon} className="searchicon"/>
             </div> 
                
            
           
        
        </div>
    )
}
export default NavBar
