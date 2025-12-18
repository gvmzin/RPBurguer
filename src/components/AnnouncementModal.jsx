import { useState, useEffect } from 'react';
import './AnnouncementModal.css'; // Vamos criar este arquivo CSS depois

function AnnouncementModal({ title, message, onClose }) {
    // Animação de entrada
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Bloqueia o scroll quando o modal abre
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Aguarda animação terminar antes de desmontar (gerenciado pelo pai se necessário, ou apenas fecha visualmente rapido)
        setTimeout(onClose, 300);
    };

    return (
        <div className={`announcement-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
            <div className="announcement-modal" onClick={e => e.stopPropagation()}>
                <div className="announcement-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={handleClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="announcement-content">
                    <p>{message}</p>
                </div>
                <div className="announcement-footer">
                    <button className="btn-primary" onClick={handleClose}>Entendi</button>
                </div>
            </div>
        </div>
    );
}

export default AnnouncementModal;
