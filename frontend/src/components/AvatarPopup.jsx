import { useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    onClickOverlay,
}) {
    const avatarRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="change-avatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onClickOverlay={onClickOverlay}
        >
            <fieldset className="popup__form-input-container">
                <fieldset className="popup__input-container">
                    <input
                        id="avatar"
                        type="url"
                        className="popup__form-input popup__form-input_avatar-name"
                        autoComplete="off"
                        required
                        name="avatar"
                        placeholder="Ссылка на аватар"
                        ref={avatarRef}
                    />
                    <span id="error-avatar" className="popup__error"></span>
                </fieldset>
            </fieldset>
        </PopupWithForm>
    );
}
