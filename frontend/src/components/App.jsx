import React, { useState, useEffect, useCallback } from 'react';
import { Main } from './Main';
import Footer from './Footer';
import { ImagePopup } from './ImagePopup';
import { ProfilePopup } from './ProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { AvatarPopup } from './AvatarPopup';
import { ConfirmPopup } from './ConfirmPopup';
import { InfoTooltip } from './InfoTooltip';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { register, authorise, getContent } from '../utils/Auth';

function App(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deleteCard, setDeleteCard] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
    const [infoTooltipPopup, setInfoTooltipPopup] = useState(false);
    const [headerEmail, setHeaderEmail] = React.useState('');
    const navigate = useNavigate();

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleConfirmPopupClick(cardId) {
        setDeleteCard(cardId);
        setConfirmPopupOpen(true);
    }

    const closeAllPopups = useCallback(() => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setConfirmPopupOpen(false);
        setInfoTooltipPopup(false);
        setSelectedCard({});
    }, []);

    useEffect(() => {
        Promise.all([api.getUser(), api.getCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((error) => {
                console.log(
                    `Ошибка получения данных пользователя и карт - ${error}`
                );
            });
    }, []);

    function handleUpdateUser({ name, about }) {
        api.updateProfileInfo(name, about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка редактирования профиля - ${error}`);
            });
    }

    function handleDeleteCardSubmit(e) {
        api.deleteCard(deleteCard)
            .then(() => {
                setCards((cards) =>
                    cards.filter((card) => {
                        return card._id !== deleteCard;
                    })
                );
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка удаления карточки - ${error}`);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        api.updateAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка загрузки нового аватара - ${error}`);
            });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(`Ошибка добавления карточки - ${error}`);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((error) => {
                    console.log(`Ошибка удаления лайка - ${error}`);
                });
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) =>
                        state.map((c) => (c._id === card._id ? newCard : c))
                    );
                })
                .catch((error) => {
                    console.log(`Ошибка добавления лайка - ${error}`);
                });
        }
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    const tokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                getContent(jwt)
                    .then((res) => {
                        if (res) {
                            setLoggedIn(true);
                            setHeaderEmail(res.data.email);
                            navigate('/', { replace: true });
                        }
                    })
                    .catch((error) => {
                        console.log(`Ошибка проверки токена - ${error}`);
                    });
            }
        }
    };

    function onRegister(email, password) {
        register(email, password)
            .then((data) => {
                if (data) {
                    setIsInfoTooltipSuccess(true);
                    navigate('/sign-in', { replace: true });
                }
            })
            .catch((error) => {
                setIsInfoTooltipSuccess(false);
                console.log(`Ошибка регистрации - ${error}`);
            })
            .finally(() => setInfoTooltipPopup(true));
    }

    function onLogin(email, password) {
        authorise(email, password)
            .then((data) => {
                if (data && data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    setHeaderEmail(email);
                    navigate('/', { replace: true });
                }
            })
            .catch((error) => {
                setIsInfoTooltipSuccess(false);
                setInfoTooltipPopup(true);
                console.log(`Ошибка входа - ${error}`);
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute
                                    element={Main}
                                    loggedIn={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardClick={handleCardClick}
                                    onDeleteCardClick={handleConfirmPopupClick}
                                    signOut={signOut}
                                    headerEmail={headerEmail}
                                />
                            }
                        />
                        <Route
                            path="/sign-in"
                            element={<Login onLogin={onLogin} />}
                        />
                        <Route
                            path="/sign-up"
                            element={<Register onRegister={onRegister} />}
                        />
                        <Route
                            path="*"
                            element={
                                loggedIn ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Navigate to="/sign-in" />
                                )
                            }
                        />
                    </Routes>
                </div>
                <ProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCards={handleAddPlaceSubmit}
                />
                <AvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                />
                <ConfirmPopup
                    onClose={closeAllPopups}
                    isOpen={confirmPopupOpen}
                    onSubmit={handleDeleteCardSubmit}
                />
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={infoTooltipPopup}
                    choicePopup={isInfoTooltipSuccess}
                />
                {loggedIn && <Footer />}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
