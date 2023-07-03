import React from 'react'
import Sidebar from '../../components/admin/Sidebar'

function Prescription() {
  return (
    <div className="w-screen h-full flex justify-between bg-slate-50">
    <div className="sidebar-width">
      <Sidebar />
    </div>
    <div className="min-h-screen h-full bg-dashboard-admin  p-8 flex flex-col gap-11 content-width">
    <h1 className='text-3xl font-bold lg:text-5xl'>Prescription</h1>

</div>          
    </div>
  )
}

export default Prescription