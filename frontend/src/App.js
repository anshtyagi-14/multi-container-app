import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {todos.map((t, i) => (
        <p key={i}>{t.title}</p>
      ))}
    </div>
  );
}

export default App;