'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import PersistProvider from './store/PersistProvider';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistProvider>{children}</PersistProvider>
    </Provider>
  );
};

export default ReduxProvider;
