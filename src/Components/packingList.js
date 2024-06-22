import { useState } from "react";

function PackingList({ items, removeItem, packedToggle, clearItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === "input") {
    sortedItem = items;
  }
  if (sortBy === "description") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            removeItem={removeItem}
            packedToggle={packedToggle}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input" key="">
            Sort by order
          </option>
          <option value="description" key="">
            Sort by descriptions
          </option>
          <option value="packed" key="">
            Sort by Packed Status
          </option>
        </select>
        <button onClick={() => clearItem()}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, removeItem, packedToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => packedToggle(item)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => removeItem(item)}>❌</button>
    </li>
  );
}

export default PackingList;
