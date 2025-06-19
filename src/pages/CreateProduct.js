import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/uploadImage";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    const productData = {
      name,
      description,
      price,
      image: imageUrl,
      category,
    };

    await axios.post("http://localhost:5000/api/products", productData);
    navigate("/admin");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>➕ Crear nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit">Crear producto</button>
      </form>
    </div>
  );
}
