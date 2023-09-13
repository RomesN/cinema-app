import { Provider } from 'react-redux';

import './App.css';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App"></div>
    </Provider>
  );
};

export default App;
