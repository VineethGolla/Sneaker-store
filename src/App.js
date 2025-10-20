import {useEffect, useState} from 'react';
import './App.css';

export default function Store() {


    const [shoes, setShoes] = useState([
        { id: 1, name: 'Air Max', price: 120, brand: 'Nike' },
        { id: 2, name: 'Ultra Boost', price: 140, brand: 'Adidas' },
        { id: 3, name: 'Old Skool', price: 80, brand: 'Vans' },
        { id: 4, name: '990 v6', price: 200, brand: 'New Balance' },
        { id: 5, name: 'Ultra Boost 22', price: 150, brand: 'Adidas' },
        { id: 6, name: 'Adidas Yeezy', price: 350, brand: 'Adidas' },
        { id: 7, name: 'Triple Sneakers', price: 1350, brand: 'Balenciaga' }
    ]);
    //useState : is like a state file. stores data.
    //useEffect : API calls, let's say during logins' no need to login everytime since it retrieves info from local..

    const [filter, setFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState(null);
    const [cart, setCart] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });
    const [orderConfirm, setOrderConfirm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = filter === 'all' ? shoes : shoes.filter(s => s.brand === filter);
    const finalFiltered = priceFilter ? filtered.filter(s => s.price <= priceFilter) : filtered;

    const searchFiltered = finalFiltered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (shoe) => {
        const existing = cart.find(item => item.id === shoe.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...shoe, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const placeOrder = () => {
        if (formData.name && formData.email && formData.address) {
            setOrderConfirm(true);
            setCart([]);
            setCheckout(false);
            setFormData({ name: '', email: '', address: '' });
        }
    };


    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            setUser(JSON.parse(saved));
        }
    }, []);

    const handleLogin = () => {
        if (email && password) {
            setUser({ email: email });
            localStorage.setItem('user', JSON.stringify({ email: email }));
            setEmail('');
            setPassword('');
        }
    };

    if (!user) {
        return (
            <div className="loginContainer">
                <div className="loginForm">
                    <h1>Sneaker Store</h1>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="formInput"/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="formInput"/>
                    <button onClick={handleLogin} className="checkoutButton">Login</button>
                </div>
            </div>
        );
    }



    if (orderConfirm) {
        return (
            <div className="confirmationContainer">
                <div className="confirmationBox">
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for your order, {formData.name}</p>
                    <button onClick={() => setOrderConfirm(false)} className="addButton">Continue Shopping</button>
                </div>
            </div>
        );
    }

    if (checkout) {
        return (
            <div className="checkoutContainer">
                <button onClick={() => setCheckout(false)} className="removeButton">Back</button>
                <div className="checkoutForm">
                    <h2>Checkout</h2>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="formInput" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="formInput"/>
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="formInput"/>
                    <h3>Total: ${totalPrice}</h3>
                    <button onClick={placeOrder} className="addButton">Place Order</button>
                </div>
            </div>
        );
    }

    return (
        <div className="pageContainer">
            <div className="header">
                <button onClick={() => { setUser(null); localStorage.removeItem('user'); }}>Logout</button>
                <h1>Sneaker Store</h1>
            </div>

            <div className="filterSection">
                <div className="brandFilters">
                    <button onClick={() => setFilter('all')} className={filter === 'all' ? 'buttonStyle active' : 'buttonStyle'}>All</button>
                    <button onClick={() => setFilter('Nike')} className={filter === 'Nike' ? 'buttonStyle active' : 'buttonStyle'}>Nike</button>
                    <button onClick={() => setFilter('Adidas')} className={filter === 'Adidas' ? 'buttonStyle active' : 'buttonStyle'}>Adidas</button>
                    <button onClick={() => setFilter('Vans')} className={filter === 'Vans' ? 'buttonStyle active' : 'buttonStyle'}>Vans</button>
                    <button onClick={() => setFilter('New Balance')} className={filter === 'New Balance' ? 'buttonStyle active' : 'buttonStyle'}>New Balance</button>
                    <button onClick={() => setFilter('Balenciaga')} className={filter === 'Balenciaga' ? 'buttonStyle active' : 'buttonStyle'}>Balenciaga</button>
                </div>

                <div className="priceFilters">
                    <button onClick={() => setPriceFilter(null)} className={priceFilter === null ? 'buttonStyle active' : 'buttonStyle'}>All Prices</button>
                    <button onClick={() => setPriceFilter(100)} className={priceFilter === 100 ? 'buttonStyle active' : 'buttonStyle'}>Under $100</button>
                    <button onClick={() => setPriceFilter(150)} className={priceFilter === 150 ? 'buttonStyle active' : 'buttonStyle'}>Under $150</button>
                    <button onClick={() => setPriceFilter(220)} className={priceFilter === 220 ? 'buttonStyle active' : 'buttonStyle'}>Under $220</button>
                </div>
            </div>

            <div className="searchSection">
                <input
                    type="text"
                    placeholder="Search sneakers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
            </div>

            <div className="productsSection">
                <h2>Products</h2>
                <div className="productsGrid">
                    {searchFiltered.map(shoe => (
                        <div key={shoe.id} className="productCard">
                            <h3>{shoe.name}</h3>
                            <p className="brand">{shoe.brand}</p>
                            <p className="price">${shoe.price}</p>
                            <button onClick={() => addToCart(shoe)} className="addButton">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cartSection">
                <h2>Cart ({cart.length})</h2>
                <div className="cartItems">
                    {cart.map((item, index) => (
                        <div key={index} className="cartItem">
                            <p>{item.name} - ${item.price} x {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)} className="removeButton">Remove</button>
                        </div>
                    ))}
                </div>
                <h3>Total: ${totalPrice}</h3>
                {cart.length > 0 && <button onClick={() => setCheckout(true)} className="checkoutButton">Checkout</button>}
            </div>
        </div>
    );

}