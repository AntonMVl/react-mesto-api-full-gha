import acceptedImage from '../images/icons/accepted.png';
import rejectedImage from '../images/icons/Rejected.png';
import { Popup } from './Popup';

export function InfoTooltip({ onClose, isOpen, choicePopup }) {
    return (
        <Popup classValue="info-tooltip" onClose={onClose} isOpen={isOpen}>
            <div className="popup__container popup__container_type_info-tooltip">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                ></button>
                <img
                    src={choicePopup ? acceptedImage : rejectedImage}
                    alt="Картинка"
                    className="popup__notice-image"
                />
                <h2 className="popup__info">
                    {choicePopup
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то прошло нет так! Попробуйте еще раз.'}
                </h2>
            </div>
        </Popup>
    );
}
