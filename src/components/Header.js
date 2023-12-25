import logo from '../images/logo.png';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <h1 className="header__title">Energy efficiency solution</h1>
    </header>
  );
}
