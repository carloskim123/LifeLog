import {Outlet} from 'react-router-dom'
import "../styles/layout.css"

function Layout() {
  return (
    <main>
        <header>
            <h3>Life Log</h3>
        </header>
        <Outlet/>
    </main>
  )
}

export default Layout;
