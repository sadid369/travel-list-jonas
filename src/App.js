import { useState } from "react";
import Logo from "./Components/logo";
import Form from "./Components/form";
import PackingList from "./Components/packingList";
import Stats from "./Components/stats";
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
  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure, you want to delete all items?"
    );
    if (confirmed) {
      setItems(initialItems);
    }
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItems={handleAddItems}></Form>
      <PackingList
        removeItem={handleRemoveItems}
        packedToggle={handlePackedToggle}
        items={items}
        clearItem={handleClearItems}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}
