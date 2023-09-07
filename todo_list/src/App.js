// import React from "react";
// import "./App.css";
// const App = () => {
//   const [todos, setTodos] = React.useState([]);
//   const [todo, setTodo] = React.useState("");
  
//   // Add the handlesubmit code here
//   function handlesubmit(e){
//       e.preventDefault();
//       const newTodo={
//           id:new Date().getTime(),
//           text:todo.trim(),
//           completed:false,
//       };
//       if(newTodo.text.length>0){
//           setTodos([...todos].concat(newTodo));
//           setTodo("");
//       }
//       else{
//         alert("Enter Valid Text");
//         setTodo("");
//       }
//   }
  
//   // Add the deleteToDo code here
//   const handleClick=(i1)=>{
//     let fl= todos.filter((obj)=>obj.id!==i1.id);
//     setTodos(fl);
//   }
  
  

  
//   // Add the submitEdits code here

  
// return(
// <div className ="App">
// <h1>Todo List</h1>
// <form onSubmit={handlesubmit}>
// <input type ="text" align ="right" onChange={(e)=>{
//     setTodo(e.target.value)
    
// }} placeholder="Add new Taskswss"
// value={todo} />
// <button type ="submit">Add Todo</button>
// </form>
// {todos.map((todo) => ( <div>
    
//     <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
    
//     <div onClick={()=>{handleClick(todo)}} style={{width:"100%",border:"1px solid black" ,display:"flex",justifyContent:"center",alignItems:"center"}}>{todo.text}</div>
    
//     </div>))}
// </div>
// );
// };
// export default App;


import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    if (todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");

    } else {

        alert("Enter Valid Task");
        setTodo("");
    }
  }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }

    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}

                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    };

export default App;