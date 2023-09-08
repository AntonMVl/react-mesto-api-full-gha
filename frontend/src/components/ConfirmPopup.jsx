import React from 'react';
import { Popup } from './Popup';

export function ConfirmPopup({ onClose, isOpen, onSubmit }) {
    function handleDeleteCardSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <Popup classValue="delete-confirmed" isOpen={isOpen} onClose={onClose}>
            <div className="popup__container popup__container_type_delete-confirmed">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title popup__title_type_confirmation">
                    Вы уверены?
                </h2>
                <button
                    type="submit"
                    className="popup__input-button popup__input-button_type_confirmation"
                    onClick={handleDeleteCardSubmit}
                >
                    Да
                </button>
            </div>
        </Popup>
    );
}
