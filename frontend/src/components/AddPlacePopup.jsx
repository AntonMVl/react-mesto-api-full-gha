import { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup({
    isOpen,
    onClose,
    onUpdateCards,
    onClickOverlay,
}) {
    const [imageName, setImageName] = useState('');
    const [imageLink, setImageLink] = useState('');

    function handleNameChange(e) {
        setImageName(e.target.value);
    }

    function handleLinkChange(e) {
        setImageLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateCards({ name: imageName, link: imageLink });
    }

    useEffect(() => {
        setImageName('');
        setImageLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            title="Новое место"
            classValue="add-img"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onClickOverlay={onClickOverlay}
        >
            <fieldset className="popup__form-input-container">
                <fieldset className="popup__input-container">
                    <input
                        id="place"
                        type="text"
                        className="popup__form-input popup__form-input_card_name"
                        autoComplete="off"
                        required
                        minLength="2"
                        maxLength="30"
                        name="imageName"
                        placeholder="Название"
                        value={imageName || ''}
                        onChange={handleNameChange}
                    />
                    <span id="error-place" className="popup__error"></span>
                </fieldset>
                <fieldset className="popup__input-container">
                    <input
                        id="url"
                        type="url"
                        className="popup__form-input popup__form-input_card_url"
                        autoComplete="off"
                        required
                        name="link"
                        placeholder="Ссылка на картинку"
                        value={imageLink || ''}
                        onChange={handleLinkChange}
                    />
                    <span id="error-url" className="popup__error"></span>
                </fieldset>
            </fieldset>
        </PopupWithForm>
    );
}
