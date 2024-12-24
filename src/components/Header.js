import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header ">
      {/* TODO: 
      import {ROUTES} from '../routes'
      <button className="header-btn" onClick={() => navigate(ROUTES.ROOT)}>


      */}
      <button className="header-btn" onClick={() => navigate('/')}>
        <img className="header__logo" src={logo} alt="логотип" />
      </button>
      <h1 className="header__title">Калькулятор энергоэффективности</h1>
    </header>
  );
}
