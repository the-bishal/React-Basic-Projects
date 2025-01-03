import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts';
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem';
import bg from './assets/bg1.jpg'


function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]) // ...prev will add the elements of the previous array
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map( (prevTodo) => ( prevTodo.id===id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter( (todo) => todo.id !== id ))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? {...prevTodo, 
          completed : !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])



  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleComplete}}>
      <div style={{ backgroundImage: `url(${bg})`}} className={`bg-contain min-h-screen py-8 backdrop-blur-xl`}>
        <div className="w-full max-w-2xl mx-auto backdrop-blur-lg bg-white/10 rounded-xl px-4 py-3 text-white shadow-2xl">
          <h1 className="text-3xl font-light text-center mb-8 mt-2">Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
