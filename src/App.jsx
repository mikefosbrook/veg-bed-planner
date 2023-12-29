import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import AddBed from './pages/AddBed/AddBed';
import Bed from './pages/Bed/Bed';
import NotFound from './pages/NotFound/NotFound';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

function App() {
  return (
    <>
      <Provider store={store}>
        <header>
          <Navigation />
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-bed" element={<AddBed />} />
            <Route path="/beds/:id" element={<Bed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Provider>
    </>
  );
}

export default App;
