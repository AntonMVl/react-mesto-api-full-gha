import { useEffect } from 'react';

export function Popup({ onClose, classValue, isOpen, children }) {
    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, [isOpen, onClose]);

    const handlePopupClose = (e) => {
        if (
            e.target.classList.contains('popup_opened') ||
            e.target.classList.contains('popup__close')
        ) {
            onClose();
        }
    };

    return (
        <section
            className={`popup popup_type_${classValue} ${
                isOpen ? 'popup_opened' : ''
            }`}
            onClick={handlePopupClose}
        >
            {children}
        </section>
    );
}
