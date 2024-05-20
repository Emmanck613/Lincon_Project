import { useEffect, useState } from 'react';

import CardList from './component/card-list/card-list.component';
import AddItem from './component/add-item/add-item.component';
import StarryNight from './component/background/background.component';

import './App.css';

const App = () => {
  const [toDoList, setList] = useState([]); //we set our toDoList, which is an empty array
  const [newItem, setNewItem] = useState(''); // Input value for new item
  const [error, setError] = useState(null);


useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos')
//once we fetch, it turns into a promise. A promise is asynchronous in javascript, it means it will eventualy have a value.
  .then((response) => response.json())
  .then((todos) => setList(todos) 
  ); 
}, []);

const handleToggleCompleted = (id) => {
  // Handle completion state change logic for the item with the given ID
  setList(prevList =>
    prevList.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

const handleAddItem = (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  let timeoutId = 0;
    
  if (!newItem.trim()) {
    setError('Ingresa una tarea'); // Set the error message

    // Clear the error message after 3 seconds using setTimeout
    timeoutId = setTimeout(() => {
      setError(null); // Clear the error state
    }, 3000);

    return; // Prevent further execution if input is empty
  }

    const newId = Math.max(...toDoList.map((todo) => todo.id)) + 1;
    const newTodoItem = { id: newId, title: newItem, completed: false };

    setList((prevList) => [...prevList, newTodoItem]);
    setNewItem(''); // Clear input field after adding

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };


  return (
    <div>
      <StarryNight/>
      <div className='max-w-md mx-auto shadow-lg rounded-[20px] overflow-hidden mt-16 my-5 bg-slate-900 z-10' style={{ position: 'relative' }}>
        <div className="px-4 py-2">
            <h1 className="text-slate-500 font-bold text-2xl uppercase flex items-center justify-center">To-Do List</h1>
        </div>
        {error && <p className="error-message text-red-700 flex items-center justify-center ">{error}</p>}
        <AddItem onSubmit={handleAddItem} value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        <CardList toDoList={toDoList} onToggleCompleted={handleToggleCompleted}/>
      </div> 
    </div>
  );
}

export default App;
