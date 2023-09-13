import { Provider } from 'react-redux';

import './App.scss';
import { store } from './redux/store';
import Header from './components/header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

export default App;
