import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Cart } from '../pages/Cart'
import { Home } from '../pages/Home'
import { ListOfCard } from '../pages'
export const AllRoutes = () => {
  return (
    <>
     <Routes>
    <Route path="/" element={<Home/>}> </Route>
     <Route path = "products" element={<ListOfCard/>}></Route>
     <Route path = "cart" element={<Cart/>}></Route>
     </Routes>
    
    </>
  )
}