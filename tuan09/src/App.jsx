import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/slices/counterSlice';
import { addTodo, toggleTodo, removeTodo } from './store/slices/todoSlice';
import { toggleTheme } from './store/slices/themeSlice';

function App() {
  const count = useSelector((state) => state.counter.count);
  const todos = useSelector((state) => state.todo.todos);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="App">
      <h1>Ứng dụng đếm số</h1>
      <h2>Số đếm: {count}</h2>
      <button onClick={() => dispatch(increment())}>Tăng</button>
      <button onClick={() => dispatch(decrement())}>Giảm</button>

      <h1>Danh sách công việc</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Thêm công việc" />
      <button onClick={handleAdd}>Thêm</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Xóa</button>
          </li>
        ))}
      </ul>

      <h1>Chuyển đổi giao diện</h1>
      <p>Giao diện hiện tại: {theme === 'light' ? 'Sáng' : 'Tối'}</p>
      <button onClick={() => dispatch(toggleTheme())}>Chuyển đổi giao diện</button>
    </div>
  );
}

export default App;