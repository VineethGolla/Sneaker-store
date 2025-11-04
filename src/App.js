import {useEffect, useState} from 'react';
import './App.css';

export default function Store() {

    // Product inventory with id, name, price, brand, and SVG image data
    const [shoes] = useState([
        { id: 1, name: 'Air Max', price: 120, brand: 'Nike', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23ff0000%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ENike Air Max%3C/text%3E%3C/svg%3E' },
        { id: 2, name: 'Ultra Boost', price: 140, brand: 'Adidas', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%230066cc%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3EAdidas Ultra Boost%3C/text%3E%3C/svg%3E' },
        { id: 3, name: 'Old Skool', price: 80, brand: 'Vans', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23000000%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3EVans Old Skool%3C/text%3E%3C/svg%3E' },
        { id: 4, name: '990 v6', price: 200, brand: 'New Balance', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23999999%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ENew Balance 990%3C/text%3E%3C/svg%3E' },
        { id: 5, name: 'Ultra Boost 22', price: 150, brand: 'Adidas', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%2300aa00%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3EUltra Boost 22%3C/text%3E%3C/svg%3E' },
        { id: 6, name: 'Adidas Yeezy', price: 350, brand: 'Adidas', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23ffaa00%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3EYeezy%3C/text%3E%3C/svg%3E' },
        { id: 7, name: 'Triple Sneakers', price: 1350, brand: 'Balenciaga', image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23aa00ff%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ETriple Sneakers%3C/text%3E%3C/svg%3E' }
    ]);

    // Filter by brand selection
    const [filter, setFilter] = useState('all');

    // Filter by price range
    const [priceFilter, setPriceFilter] = useState(null);

    // Shopping cart items with quantity
    const [cart, setCart] = useState([]);

    // Toggle checkout form display
    const [checkout, setCheckout] = useState(false);

    // Form data for checkout (name, email, address)
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });

    // Show order confirmation message
    const [orderConfirm, setOrderConfirm] = useState(false);

    // Search input for product name or brand
    const [searchTerm, setSearchTerm] = useState('');

    // Apply brand filter to products
    const filtered = filter === 'all' ? shoes : shoes.filter(s => s.brand === filter);

    // Apply price filter to already filtered products
    const finalFiltered = priceFilter ? filtered.filter(s => s.price <= priceFilter) : filtered;

    // Apply search filter to name and brand
    const searchFiltered = finalFiltered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add product to cart or increase quantity if already exists
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

    // Remove product from cart by id
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Calculate total price of all items in cart
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Handle form input change for checkout form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate form and place order
    const placeOrder = () => {
        if (formData.name && formData.email && formData.address) {
            setOrderConfirm(true);
            setCart([]);
            setCheckout(false);
            setFormData({ name: '', email: '', address: '' });
        }
    };

    // Store logged-in user state
    const [user, setUser] = useState(null);

    // Email input for login
    const [email, setEmail] = useState('');

    // Password input for login
    const [password, setPassword] = useState('');

    // Load user from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem('user');
        if (saved) {
            setUser(JSON.parse(saved));
        }
    }, []);

    // Authenticate user and save to localStorage
    const handleLogin = () => {
        if (email && password) {
            setUser({ email: email });
            localStorage.setItem('user', JSON.stringify({ email: email }));
            setEmail('');
            setPassword('');
        }
    };

    // Show login page if user not authenticated
    if (!user) {
        return (
            <div className="loginContainer">
                <div className="loginForm">
                    <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffe66d)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 8px 16px rgba(0,0,0,0.2)', animation: 'pulse 2s infinite'}}>Sneaker Store</h1>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="formInput"/>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="formInput"/>
                    <button onClick={handleLogin} className="checkoutButton">Login</button>
                </div>
            </div>
        );
    }

    // Show order confirmation page after successful checkout
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


    // Show checkout form if checkout button clicked
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

    // Main shopping page with products, filters, and cart
    return (
        <div className="pageContainer" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', minHeight: '100vh'}}>
            <div className="header">
                <button onClick={() => { setUser(null); localStorage.removeItem('user'); }}>Logout</button>
                <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffe66d)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 8px 16px rgba(0,0,0,0.2)', animation: 'pulse 2s infinite'}}>Sneaker Store</h1>
            </div>

            {/* Brand and price filter buttons */}
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

            {/* Search bar for filtering by product name or brand */}
            <div className="searchSection">
                <input
                    type="text"
                    placeholder="Search sneakers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchInput"
                />
            </div>

            {/* Display filtered products in grid */}
            <div className="productsSection">
                <h2>Products</h2>
                <div className="productsGrid">
                    {searchFiltered.map(shoe => (
                        <div key={shoe.id} className="productCard">
                            <img src={shoe.image} alt={shoe.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                            <h3>{shoe.name}</h3>
                            <p><strong>Brand:</strong> {shoe.brand}</p>
                            <p><strong>Price:</strong> ${shoe.price}</p>
                            <button onClick={() => addToCart(shoe)} className="addButton">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display cart items and total price */}
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
