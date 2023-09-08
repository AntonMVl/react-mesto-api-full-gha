import logo from '../images/icons/Header-logo.svg';
import { Link } from 'react-router-dom';

function Header({ buttonValue, endpoint, onClick, loggedIn, headerEmail }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место" />
            {loggedIn && <p className="header__email">{headerEmail}</p>}
            <Link to={endpoint}>
                <button className="header__button link" onClick={onClick}>
                    {buttonValue}
                </button>
            </Link>
        </header>
    );
}

export default Header;
