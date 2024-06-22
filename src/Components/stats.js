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
          ? ` 💼 You have ${items.length} items on your list, and you already packed
    
          ${itemPacked} (${percentage}%).`
          : `You got everything! ready to go`}
      </em>
    </footer>
  );
}
export default Stats;
