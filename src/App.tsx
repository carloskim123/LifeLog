import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import Layout from './layouts/Layout'
import Sheet from './pages/Sheet'
import "./index.css"
import ScreenSizeComponent from './pages/Sizes'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' Component={Layout}>
        <Route index Component={Sheet}/>
        <Route path='/sizes' Component={ScreenSizeComponent}/>

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

