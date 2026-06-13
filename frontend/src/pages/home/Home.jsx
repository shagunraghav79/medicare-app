import React from "react";
import "./Home.css";
import Nav from "../../component/Nav/nav";
import Hero from "../../component/hero/hero";
import Option from "../../component/options/option";
import MedDisplay from "../../component/meditem/meditem";
import Footer from "../../component/footer/footer";



const Home = ({setShowLoginPopup}) => {
  const[category,setCategory]=React.useState("All")
  return (
   <>
   <Nav />
   <Hero setShowLoginPopup={setShowLoginPopup}/>
  <Option category={category} setCategory={setCategory}/>
  <MedDisplay/>
  <Footer/>
   </>
  );
}

export default Home; 
