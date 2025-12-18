import { useState, useEffect } from 'react';

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        reference: '',
        paymentMethod: 'pix', // pix, card, money
        changeFor: ''
    });

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        if (!formData.name || !formData.address) {
            alert('Por favor, preencha seu nome e endereço.');
            return;
        }

        // Format Message
        let message = `*Olá! Gostaria de fazer um pedido:*\n\n`;

        cartItems.forEach(item => {
            message += `*${item.quantity}x ${item.name}* - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
        });

        message += `\n------------------------------\n`;
        message += `*Nome:* ${formData.name}\n`;
        message += `*Endereço:* ${formData.address}\n`;
        if (formData.reference) message += `*Referência:* ${formData.reference}\n`;

        const paymentLabel = {
            pix: 'Pix',
            card: 'Cartão',
            money: 'Dinheiro'
        };

        message += `*Forma de Pagamento:* ${paymentLabel[formData.paymentMethod]}\n`;

        if (formData.paymentMethod === 'money' && formData.changeFor) {
            message += `*Troco para:* R$ ${formData.changeFor}\n`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5571983578408?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Seu Pedido</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                            Seu carrinho está vazio.
                        </p>
                    ) : (
                        <>
                            <div style={{ marginBottom: '2rem' }}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <span className="price" style={{ fontSize: '0.9rem', marginTop: 0 }}>R$ {item.price.toFixed(2).replace('.', ',')}</span>
                                            <div className="cart-item-controls">
                                                <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Dados de Entrega</h4>

                                <div className="form-group">
                                    <label>Nome Completo*</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Endereço Completo*</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Rua, Número, Bairro"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Ponto de Referência</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.reference}
                                        onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                                        placeholder="Ex: Próximo ao mercado..."
                                    />
                                </div>

                                <h4 style={{ marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--color-primary)' }}>Pagamento</h4>

                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="pix"
                                            checked={formData.paymentMethod === 'pix'}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        /> Pix
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        /> Cartão
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="money"
                                            checked={formData.paymentMethod === 'money'}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        /> Dinheiro
                                    </label>
                                </div>

                                {formData.paymentMethod === 'money' && (
                                    <div className="form-group">
                                        <label>Troco para quanto?</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={formData.changeFor}
                                            onChange={(e) => setFormData({ ...formData, changeFor: e.target.value })}
                                            placeholder="Ex: 50"
                                        />
                                    </div>
                                )}

                            </div>
                        </>
                    )}
                </div>

                <div className="cart-footer">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Total:</span>
                        <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Finalizar Pedido no WhatsApp
                    </button>
                </div>
            </div>
        </>
    );
}
