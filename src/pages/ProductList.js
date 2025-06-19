import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 Lista de Productos</h2>
      <Link to="/create">➕ Crear nuevo producto</Link>
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: "1rem" }}>
            <strong>{product.name}</strong> - ${product.price}
            <br />
            <img src={product.image} alt={product.name} style={{ width: "80px" }} />
            <br />
            <Link to={`/edit/${product._id}`}>✏️ Editar</Link> |{" "}
            <button onClick={() => handleDelete(product._id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
