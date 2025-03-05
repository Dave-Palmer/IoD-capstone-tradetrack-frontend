import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import StaffPage from '../pages/StaffPage'
import InventoryPage from '../pages/InventoryPage'
import AlertsPage from '../pages/AlertsPage'
import StaffDashboardPage from '../pages/StaffDashboardPage'
import WorkshopItemsPage from '../pages/WorkshopItemsPage'
import LoginPage from '../pages/LoginPage'
import { ProtectedRoute, ProtectedAdminRoute } from './ProtectedRoute'


export const AppRoutes = (props) => {
    return (
        <div className='mainContainer'>
        <Routes>
            <Route exact path='/login' element={<LoginPage {...props} />} />
            <Route exact path='/home' element={<HomePage {...props} />} />
            <Route exact path='/staff' element={<ProtectedAdminRoute><StaffPage {...props} /></ProtectedAdminRoute>} />
            <Route exact path='/inventory' element={<ProtectedAdminRoute><InventoryPage {...props} /></ProtectedAdminRoute>} />
            <Route exact path='/alerts' element={<ProtectedAdminRoute><AlertsPage {...props} /></ProtectedAdminRoute>} />
            <Route exact path='/dashboard' element={<ProtectedRoute><StaffDashboardPage {...props} /></ProtectedRoute>} />
            <Route exact path='/workshopitems' element={<ProtectedRoute><WorkshopItemsPage {...props} /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedAdminRoute><HomePage {...props} /></ProtectedAdminRoute>} />
        </Routes>
        </div>
    )
}
