export default function CartItem({ item }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
      <h4>{item.name}</h4>
      <p>Cantidad: {item.quantity}</p>
      <p>Precio: ${item.price}</p>
    </div>
  );
}
