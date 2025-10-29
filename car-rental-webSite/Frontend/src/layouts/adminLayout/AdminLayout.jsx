import { Outlet} from "react-router-dom";

import React from 'react'
import DashboardStats from "../../components/admin/dashboard/DashboardStats";



const AdminLayout= () => {
  return (

    <div>
       <DashboardStats/>
        <main className="min-h-[80vh]">
            
            <Outlet/>
        </main>
      
    </div>
  )
}

export default AdminLayout