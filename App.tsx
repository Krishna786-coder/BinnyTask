import React from 'react'
import RootStack from './src/navigation/RootStack'
import { Provider } from 'react-redux';
import { store } from './src/store/Store/store';

const App = () => {
  return (
    <Provider store={store}>
     <RootStack/>
     </Provider>

  )
}

export default App;