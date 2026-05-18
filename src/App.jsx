import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const isFirstRender = useRef(true);  // Ref to track the first render

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { // Check if it's the first render if(true) → stop and set to false, if(false) → save to localStorage 
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleDelete = (e, id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const hadleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const pendingCount = todos.filter(todo => !todo.isCompleted).length;

  const handleClearAll = () => {
    setTodos([]);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-[93vh] flex justify-center items-start bg-gradient-to-br from-violet-100 to-purple-200 px-3 sm:px-5 py-6 sm:py-10">

        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-4 sm:p-6">

          {/* Add Todo */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-violet-800 mb-3">
              Add a Todo
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Write something important..."
                className="w-full flex-1 px-4 py-2 rounded-lg border border-violet-300
          focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-violet-600 text-white font-medium
          hover:bg-violet-700 disabled:bg-violet-300 transition"
              >
                Add
              </button>

            </div>
          </div>

          {/* Heading */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Your Todos
          </h2>

          <div className="space-y-3">

            {todos.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                No todos yet 🚀
              </div>
            )}

            {todos.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg">

                {/* Left Side */}
                <div className="flex items-start sm:items-center gap-3 flex-1">

                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={hadleCheckbox}
                    name={item.id}
                    className="w-5 h-5 accent-violet-600 mt-1 sm:mt-0"
                  />

                  <span
                    className={`break-words text-sm sm:text-lg ${item.isCompleted
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                      }`}
                  >
                    {item.todo}
                  </span>

                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full sm:w-auto">

                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="flex-1 sm:flex-none px-3 py-2 text-sm rounded-lg bg-blue-500
              hover:bg-blue-600 text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="flex-1 sm:flex-none px-3 py-2 text-sm rounded-lg bg-red-500
              hover:bg-red-600 text-white transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 border-t">

              <span className="text-sm text-gray-600">
                Pending:{" "}
                <span className="font-semibold text-violet-700">
                  {pendingCount}
                </span>
              </span>

              <button
                onClick={handleClearAll}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white transition"
              >
                Clear All
              </button>

            </div>

          </div>

          <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
            Stay consistent. Small steps matter 💜
          </p>

        </div>
      </div>
    </>
  );
}

export default App;
