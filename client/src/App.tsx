
import Hero from './assets/Sunrise.jpg'
import './App.css'

function App() {
  

  return (
    <>
      <div className='app-container'>
        <img 
          src={Hero} 
          className='hero'
        />
        
        <div className='overlay'>
          Welcome to Ecommy.com
          <button className='enter-button'>
            Open Ecommy
          </button>
        </div>
        
      </div>
      
    </>
  )
}

export default App
