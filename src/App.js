import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Info from './components/info';
function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
