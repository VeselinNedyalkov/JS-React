import { useState } from 'react';
import Logo from './Logo'
import Form from './Form'
import { PackingList } from './PackingList';
import { Stats } from './Stats';
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

  function handleClearItem() {
    const confirmaed = window.confirm('Are you sure you want to delete all ?');

    if (confirmaed) setItem([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={hadleDeteleItem}
        onToggleItems={hanleToggleItem} onClearItems={handleClearItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;
