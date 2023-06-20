
// components
import Header from './components/header/Header.jsx';
import Home from './components/home/Home';
import DetailView from './components/details/DetailView.jsx';
import Cart from './components/cart/Cart.jsx';

import DataProvider from './context/DataProvider.jsx';

import { Box } from '@mui/material';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        {/* we are adding a marginTop of 54px as the Home will get hidden behind the Header component(whose height is 54px) as the position of Header component is fixed */}
        <Box style={{ marginTop: 54 }}>
        {/* we wrap those components with Routes in which we want routing */}
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/product/:id' element={<DetailView />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
