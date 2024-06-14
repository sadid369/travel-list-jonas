import { useState } from "react";

const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: false },
  // { id: 2, description: "Socks", quantity: 12, packed: false },
  // { id: 3, description: "Chargers", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleRemoveItems(item) {
    const updatedItems = items.filter((el) => item.id !== el.id);
    setItems([...updatedItems]);
  }
  function handlePackedToggle(item) {
    const index = items.findIndex((el) => item.id === el.id);
    const itemsCopy = [...items];
    itemsCopy[index].packed = !itemsCopy[index].packed;

    setItems([...itemsCopy]);
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItems={handleAddItems}></Form>
      <PackingList
        removeItem={handleRemoveItems}
        packedToggle={handlePackedToggle}
        items={items}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Way 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription((d) => (d = ""));
    setQuantity((q) => (q = 5));
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, removeItem, packedToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            removeItem={removeItem}
            packedToggle={packedToggle}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start Adding Items in Packing List</em>
      </footer>
    );
  }
  const itemPacked = items.filter((item) => {
    return item.packed === true;
  }).length;
  const percentage = Math.round((itemPacked / items.length) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? ` 💼 You have {items.length} items on your list, and you already packed
  
        ${itemPacked} (${percentage}%).`
          : `You got everything! ready to go`}
      </em>
    </footer>
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
