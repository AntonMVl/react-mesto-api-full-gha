import { Popup } from './Popup';
export function PopupWithForm({
    title,
    classValue,
    buttonText,
    isOpen,
    onClose,
    children,
    onSubmit,
}) {
    return (
        <Popup classValue={classValue} isOpen={isOpen} onClose={onClose}>
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <form
                    className="popup__form"
                    name={`${classValue}-container`}
                    method="post"
                    onSubmit={onSubmit}
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className="popup__input-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </Popup>
    );
}
