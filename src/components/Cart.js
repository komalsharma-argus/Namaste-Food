import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../../utils/cartSlice";

const Cart = () => {
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, i) => sum + (i.price || i.defaultPrice || 0) / 100, 0);

  return (
    <div className="menu">
      <h1>Cart</h1>
      {items.length === 0 ? (
        <h3>Your cart is empty. Add some items from a restaurant menu.</h3>
      ) : (
        <>
          <button onClick={() => dispatch(clearCart())}>Clear cart</button>
          {items.map((item, i) => (
            <div key={item.id + "-" + i} className="menu-item">
              <div className="menu-item-text">
                <h4>{item.name}</h4>
                <p>₹{(item.price || item.defaultPrice || 0) / 100}</p>
              </div>
              <button onClick={() => dispatch(removeItem(i))}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;