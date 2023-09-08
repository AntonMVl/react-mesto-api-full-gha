import { Link } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    return (
        <>
            <Header buttonValue="Войти" endpoint="/sign-in" />
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form
                    method="post"
                    noValidate
                    className="login__form-container"
                    onSubmit={handleSubmit}
                >
                    <fieldset className="login__input-container">
                        <input
                            id="email"
                            type="email"
                            className="login__input"
                            autoComplete="off"
                            required
                            minLength="2"
                            maxLength="40"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <span id="error-name" className="login__error"></span>
                    </fieldset>
                    <fieldset className="login__input-container">
                        <input
                            id="password"
                            type="password"
                            className="login__input"
                            autoComplete="off"
                            required
                            minLength="2"
                            maxLength="200"
                            name="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <span id="error-job" className="login__error"></span>
                    </fieldset>
                    <button className="login__button link" type="submit">
                        Зарегистрироваться
                    </button>
                    <p className="login__info">
                        Уже зарегистрированы?{' '}
                        <Link to="/sign-in" className="login__info link">
                            Войти
                        </Link>
                    </p>
                </form>
            </section>
        </>
    );
}

export default Register;
