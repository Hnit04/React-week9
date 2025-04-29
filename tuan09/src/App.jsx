import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/slices/counterSlice';

function App() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Số đếm: {count}</h1>
      <button onClick={() => dispatch(increment())}>Tăng</button>
      <button onClick={() => dispatch(decrement())}>Giảm</button>
    </div>
  );
}

export default App;