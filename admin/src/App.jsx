import { useState } from 'react'
import Navbar from './component/navbar/navbar'
import Sidebar from './component/sidebar/sidebar'
import { Routes, Route ,Navigate} from "react-router-dom";
import Add from './pages/add/add';
import Orders from './pages/orders/orders';
import List from './pages/list/list';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
      <div>
       <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
             <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div> 
    </>
  )
}
export default App
