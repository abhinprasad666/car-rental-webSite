import { Outlet} from "react-router-dom";

import React from 'react'

import Footer from "../../components/user/footer/Footer";
import Navbar from "../../components/user/header/NavBar";


const MainLayout = () => {
  return (

    <div>
        <Navbar/>
        <main className="min-h-[80vh]">
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout