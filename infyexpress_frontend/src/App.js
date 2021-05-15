import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Provider } from 'react-redux';
import MainComponent from './Components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import {store} from './redux/configureStore';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
