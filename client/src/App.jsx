import React from 'react'
import { ROUTES } from './routes/routes.jsx'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
const routes = createBrowserRouter(ROUTES)
const App = () => {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App