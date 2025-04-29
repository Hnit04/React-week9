import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/slices/counterSlice';
import { addTodo, toggleTodo, removeTodo } from './store/slices/todoSlice';
import { toggleTheme } from './store/slices/themeSlice';
import { addItem, removeItem, updateQuantity } from './store/slices/cartSlice';
import { login, logout } from './store/slices/authSlice';

function App() {
  const count = useSelector((state) => state.counter.count);
  const todos = useSelector((state) => state.todo.todos);
  const theme = useSelector((state) => state.theme.theme);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
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

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = () => {
    dispatch(login({ name: 'Trần Công Tính', email: 'trancongtinh20042004@gmail.com' }));
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

      <h1>Giỏ hàng</h1>
      <button
        onClick={() =>
          dispatch(addItem({ id: Date.now(), name: 'Sản phẩm', price: 10 }))
        }
      >
        Thêm sản phẩm
      </button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => dispatch(removeItem(item.id))}>Xóa</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))
              }
            />
          </li>
        ))}
      </ul>
      <p>Tổng số lượng: {totalQuantity}</p>
      <p>Tổng tiền: ${totalPrice}</p>

      <h1>Quản lý đăng nhập</h1>
      {isLoggedIn ? (
        <div>
          <p>Xin chào, {user?.name}!</p>
          <button onClick={() => dispatch(logout())}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
      )}
    </div>
  );
}

export default App;