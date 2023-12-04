import {Outlet} from 'react-router-dom'
import "../styles/layout.css"

function Layout() {
  return (
    <main>

        <Outlet/>
    </main>
  )
}

export default Layout;
