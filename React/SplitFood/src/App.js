import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectFriend, setSeletedFriend] = useState(null);

  function handleShowFriend() {
    setShowAddFriend(show => !show);
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
  }

  function handleSelection(friend) {
    setSeletedFriend(curr => curr?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectFriend.id ?
          { ...friend, balance: friend.balance + value }
          : friend));

    setSeletedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectFriend={selectFriend}
        />
        {showAddFriend && <FormAddFriend addFriend={handleAddFriend} />}
        <Button onClick={handleShowFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      {selectFriend && <FormSplitBill selectFriend={selectFriend}
        onSplitBill={handleSplitBill} />}
    </div>
  );
}

function Button({ children, onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>
}

function FriendsList({ friends, onSelection, selectFriend }) {

  return <ul>
    {friends.map(friend =>
    (<Friend friend={friend}
      key={friend.id}
      onSelection={onSelection}
      selectFriend={selectFriend}
    />))}
  </ul>
}

function Friend({ friend, onSelection, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} $</p>}
      {friend.balance === 0 && <p>You and your {friend.name} are even! </p>}
      {friend.balance > 0 && <p className="green">{friend.name} owe you {Math.abs(friend.balance)} $</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  )
}



function FormAddFriend({ addFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id
    };

    addFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u=499476")
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend name 👭</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)} />

    <label>Image URL 🖼</label>
    <input type="text" value={image} onChange={e => setImage(e.target.value)} />

    <Button>Add</Button>
  </form>
}

function FormSplitBill({ selectFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);

  }

  return <form className="form-split-bill">
    <h2> Split a bill with {selectFriend.name}</h2>

    <label>💸 Bill value</label>
    <input type="text" value={bill}
      onChange={e => setBill(Number(e.target.value))} />


    <label>🕺 Your expense </label>
    <input type="text" value={paidByUser}
      onChange={e => setPaidByUser(Number(e.target.value)) > bill ?
        paidByUser : Number(e.target.value)} />

    <label>👭 {selectFriend.name} expense </label>
    <input type="text" disabled value={paidByFriend} />

    <label>🤑 Who is paying the bill</label>
    <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
      <option value='user'>You</option>
      <option value='friend'>{selectFriend.name}</option>
    </select>

    <Button onClick={handleSubmit}>Split bill</Button>
  </form>
}

export default App;
