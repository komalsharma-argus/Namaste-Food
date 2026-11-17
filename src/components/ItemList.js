import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";
import { CDN_URL } from "../../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {items.map(({ card }) => {
        const { id, name, price, defaultPrice, description, imageId } = card.info;
        const rupees = (price || defaultPrice || 0) / 100;
        return (
          <div key={id} className="menu-item">
            <div className="menu-item-text">
              <h4>{name}</h4>
              <p>₹{rupees}</p>
              <small>{description}</small>
            </div>
            <div className="menu-item-img">
              {imageId && <img src={CDN_URL + imageId} alt={name} />}
              <button onClick={() => dispatch(addItem(card.info))}>Add +</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;