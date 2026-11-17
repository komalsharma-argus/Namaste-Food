import ItemList from "./ItemList";

const RestaurantCategory = ({ data, isOpen, toggle }) => (
  <div className="category">
    <div className="category-header" onClick={toggle}>
      <span>{data.title} ({data.itemCards?.length || 0})</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </div>
    {isOpen && <ItemList items={data.itemCards || []} />}
  </div>
);

export default RestaurantCategory;