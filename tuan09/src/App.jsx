import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './store/slices/counterSlice';
import { addTodo, toggleTodo, removeTodo } from './store/slices/todoSlice';
import { toggleTheme } from './store/slices/themeSlice';
import { addItem, removeItem, updateQuantity } from './store/slices/cartSlice';
import { login, logout } from './store/slices/authSlice';
import { fetchUsers } from './store/slices/userSlice';
import { updateInput, calculateResult } from './store/slices/bmiSlice';
import { addEvent, deleteEvent } from './store/slices/eventSlice';

function App() {
  const count = useSelector((state) => state.counter.count);
  const todos = useSelector((state) => state.todo.todos);
  const theme = useSelector((state) => state.theme.theme);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { users, status, error } = useSelector((state) => state.users);
  const { height, weight, result } = useSelector((state) => state.bmi);
  const events = useSelector((state) => state.event.events);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleAddEvent = () => {
    if (eventTitle && eventDate) {
      dispatch(addEvent({ title: eventTitle, date: eventDate }));
      setEventTitle('');
      setEventDate('');
    }
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLogin = () => {
    dispatch(login({ name: 'Nguyễn Văn A', email: 'a@example.com' }));
  };

  return (
    <div className="App">
      <h1>Ứng dụng đếm số nâng cao</h1>
      <h2>Số đếm: {count}</h2>
      <button onClick={() => dispatch(increment())}>Tăng</button>
 Reagent: <button onClick={() => dispatch(decrement())}>Giảm</button>
      <button onClick={() => dispatch(reset())}>Đặt lại</button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        placeholder="Nhập số"
      />
      <button onClick={() => dispatch(incrementByAmount(amount))}>
        Tăng theo số
      </button>

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

      <h1>Danh sách người dùng</h1>
      {status === 'loading' && <p>Đang tải...</p>}
      {status === 'failed' && <p>Lỗi: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h1>Tính BMI</h1>
      <div>
        <label>Chiều cao (cm): </label>
        <input
          type="number"
          value={height || ''}
          onChange={(e) =>
            dispatch(updateInput({ field: 'height', value: +e.target.value }))
          }
        />
      </div>
      <div>
        <label>Cân nặng (kg): </label>
        <input
          type="number"
          value={weight || ''}
          onChange={(e) =>
            dispatch(updateInput({ field: 'weight', value: +e.target.value }))
          }
        />
      </div>
      <button onClick={() => dispatch(calculateResult())}>Tính</button>
      {result && <p>BMI: {result.toFixed(2)}</p>}

      <h1>Quản lý sự kiện</h1>
      <div>
        <input
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Tên sự kiện"
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <button onClick={handleAddEvent}>Thêm</button>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.date}
            <button onClick={() => dispatch(deleteEvent(event.id))}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;