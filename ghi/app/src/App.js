import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LocationForm from './LocationForm';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm';
import ShoeDetail from './ShoeDetail'
import HatForm from './HatForm';
import HatsList from './HatsList';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/location/" element={<LocationForm />} />
          <Route path="/shoes/" element={<ShoeList />} />
          <Route path="/shoes/:id/" element={<ShoeDetail />} />
          <Route path='/shoes/new/' element={<ShoeForm />} />
          <Route path="/hat/" element={<HatForm />} />
          <Route path="/hats/" element={<HatsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
