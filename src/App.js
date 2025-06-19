// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/Cart';
import CategoryPage from './pages/CategoryPage';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Animacion from "./pages/Animacion";

import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext'; // ✅ Importamos UserProvider





export default function App() {
  return (
    <UserProvider> {/* ✅ Envolver todo con UserProvider */}
      <CartProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/admin" element={<ProductList />} />
                <Route path="/animacion" element={<Animacion />} />
<Route path="/create" element={<CreateProduct />} />
<Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/ordenes" element={<Orders />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/categoria/:nombre" element={<CategoryPage />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
