import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("❌ Error al cargar producto:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      navigate("/admin");
    } catch (err) {
      console.error("❌ Error al editar:", err);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✏️ Editar producto</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={product.name} onChange={handleChange} required />
        <input name="price" value={product.price} onChange={handleChange} required type="number" />
        <input name="image" value={product.image} onChange={handleChange} required />
        <input name="type" value={product.type} onChange={handleChange} required />
        <textarea name="description" value={product.description} onChange={handleChange} required />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
    