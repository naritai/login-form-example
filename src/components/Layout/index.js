import { Outlet } from 'react-router-dom';
import './LayoutStyles.css';

const Layout = () => {
  return (
    <main className="layout">
      <Outlet />
    </main>
  )
}

export { Layout };