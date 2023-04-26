import { useAuth } from '../../hooks/useAuth';
import './HomePageStyles.css';

const HomePage = () => {
  const { auth } = useAuth();
  return (
    <div className="home-page">
      <h1>Hello, {auth?.user}! Welcome to the home page!</h1>
    </div>
  )
}

export { HomePage };