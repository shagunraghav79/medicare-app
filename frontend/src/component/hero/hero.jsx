import react, { useContext } from 'react'
import './hero.css'
import { CartContext } from "../../component/context/CartContext";



const Hero = ({ setShowLoginPopup }) => {
  const { token, setToken } = useContext(CartContext);
  // console.log("Hero Token:", token);
  // console.log("Storage Token:", localStorage.getItem("token"));

//  const token = localStorage.getItem("token");

// console.log("Token from localStorage:", token);

  return (
    <>
      <div>
        <div className="hero-sec">
          <div className="hero1">
            <div className="hed1">
              <div className="hed11"> <p>Best</p> </div>
              <div className="hed12"><p>Medicines</p></div>
            </div>
            <div className="hed2"> <p> at your </p></div>
            <div className="hed3"> <p> Doorsteps</p></div>
            {!token ? <div className="log-button">
              <button onClick={() => setShowLoginPopup(true)} className="log-btn">Sign In</button>
            </div>
              : <div className='hero-wel'>
                WELCOME
              </div>}

          </div>
          <div className="hero2">

          </div>
        </div>


      </div>
 

    </>
  )
}

export default Hero
