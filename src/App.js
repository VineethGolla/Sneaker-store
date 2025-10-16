import { useState } from 'react';

export default function Store() {
    const [shoes] = useState([
        { id: 1, name: 'Air Max', price: 120, brand: 'Nike' },
        { id: 2, name: 'Ultra Boost', price: 140, brand: 'Adidas' },
        { id: 3, name: 'Old Skool', price: 80, brand: 'Vans' }
    ]);

    const [filter, setFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState(null);
    const [cart, setCart] = useState([]);

    const filtered = filter === 'all' ? shoes : shoes.filter(s => s.brand === filter);
    const finalFiltered = priceFilter ? filtered.filter(s => s.price <= priceFilter) : filtered;

    const addToCart = (shoe) => {
        setCart([...cart, shoe]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const buttonStyle = (isActive) => ({
        padding: '10px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#333' : '#f0f0f0',
        color: isActive ? '#fff' : '#000',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.3s ease'
    });

    const addButtonStyle = {
        padding: '8px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const removeButtonStyle = {
        padding: '5px 10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div>
            <h1>Sneaker Store</h1>

            <div>
                <button onClick={() => setFilter('all')} style={buttonStyle(filter === 'all')}>All</button>
                <button onClick={() => setFilter('Nike')} style={buttonStyle(filter === 'Nike')}>Nike</button>
                <button onClick={() => setFilter('Adidas')} style={buttonStyle(filter === 'Adidas')}>Adidas</button>
                <button onClick={() => setFilter('Vans')} style={buttonStyle(filter === 'Vans')}>Vans</button>
            </div>

            <div>
                <button onClick={() => setPriceFilter(null)} style={buttonStyle(priceFilter  === null)}>All Prices</button>
                <button onClick={() => setPriceFilter(100)} style={buttonStyle(priceFilter  === 100)}>Under $100</button>
                <button onClick={() => setPriceFilter(120)} style={buttonStyle(priceFilter  === 120)}>Under $120</button>
            </div>

            <h2>Products</h2>
            {finalFiltered.map(shoe => (
                <div key={shoe.id}>
                    <h3>{shoe.name}</h3>
                    <p>{shoe.brand}</p>
                    <p>${shoe.price}</p>
                    <button onClick={() => addToCart(shoe)}  style={removeButtonStyle}>Add to Cart</button>
                </div>
            ))}

            <h2>Cart ({cart.length})</h2>
            {cart.map((item, index) => (
                <div key={index}>
                    <p>{item.name} - ${item.price}</p>
                    <button onClick={() => removeFromCart(item.id)}  style={removeButtonStyle}>Remove</button>
                </div>
            ))}
            <h3>Total: ${totalPrice}</h3>
        </div>
    );
}