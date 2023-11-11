import { useState } from 'react';
import './index.css';



function App() {
  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function hadleDeteleItem(id) {
    setItem(items => items.filter(item => item.id !== id));
  }

  function hanleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item))
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={hadleDeteleItem} onToggleItems={hanleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>
}



function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);


  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() }

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trop?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map(num => <option value={num} key={num}>{num}</option>)
        }
      </select>
      <input type='text' placeholder='Item...' value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice()
    .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed));;

  return (
    <div className='list'>
      <ul >
        {sortedItems.map((item) =>
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id} />)}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option valie="input">Sort by input order</option>
          <option valie="description">Sort by description</option>
          <option valie="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const precentage = Math.round(numPacked / numItems * 100)

  return (
    <footer className='stats'>
      <em>
        {precentage === 100 ? 'You got everything! Ready to go ✈' :
          `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${precentage}%)`}
      </em>
    </footer>
  )
}

export default App;
