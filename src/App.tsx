import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Layout from './layouts/Layout'
import Sheet from './pages/Sheet'
import "./index.css"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' Component={Layout}>
        <Route index Component={Sheet}/>
      </Route>
    )
  )
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App

