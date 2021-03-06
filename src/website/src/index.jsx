import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Styling
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Redux stuff
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// // Persistant redux
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import * as serviceWorker from './serviceWorker';
import Home from './screens/home';
import rootReducer from './redux-modules';

// Persisted config.
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer);
// const persistor = persistStore(store);

// Dark theme

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

const component = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(component, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
