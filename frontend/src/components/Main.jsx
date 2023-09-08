import { useContext } from 'react';
import { Card } from '../components/Card';
import buttonUserNameImage from '../images/icons/Vector.png';
import buttonAddNewImage from '../images/icons/plus.png';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';

export function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    cards,
    onCardLike,
    onCardClick,
    onDeleteCardClick,
    signOut,
    loggedIn,
    headerEmail,
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header
                buttonValue="Выйти"
                onClick={signOut}
                loggedIn={loggedIn}
                headerEmail={headerEmail}
            />
            <main className="main">
                <section className="profile">
                    <img
                        className="profile__image"
                        src={currentUser.avatar ? currentUser.avatar : '#'}
                        alt="Аватар"
                    />
                    <button
                        className="profile__image-button"
                        type="button"
                        onClick={onEditAvatar}
                    ></button>
                    <div className="profile__user-info">
                        <div className="profile__input-info">
                            <h1 className="profile__name">
                                {currentUser.name ? currentUser.name : ''}
                            </h1>
                            <button
                                type="button"
                                onClick={onEditProfile}
                                className="profile__editing-button link"
                            >
                                <img
                                    className="profile__editing-img"
                                    src={buttonUserNameImage}
                                    alt="Редактирование профиля"
                                />
                            </button>
                        </div>
                        <p className="profile__job-title">
                            {currentUser.about ? currentUser.about : ''}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onAddPlace}
                        className="profile__content-button link"
                    >
                        <img
                            className="profile__content-img"
                            src={buttonAddNewImage}
                            alt="Кнопка добавления контента"
                        />
                    </button>
                </section>
                <section className="content">
                    <ul className="content__box-list">
                        {cards.map((card) => {
                            return (
                                <li className="content__box" key={card._id}>
                                    <Card
                                        card={card}
                                        onCardLike={onCardLike}
                                        onCardClick={onCardClick}
                                        onDeleteCardClick={onDeleteCardClick}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </main>
        </>
    );
}
