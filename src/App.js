import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import Header from './component/Header';
import DayList from './component/DayList';
import Day from './component/Day';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';
import DeleteDay from './component/DeleteDay';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<DayList/>} />
        <Route path='/day/:day' element={<Day/>} />
          <Route path='/create_word' element={<CreateWord/>} />
          <Route path='*' element={<EmptyPage />} />
          <Route path='/create_day' element={<CreateDay />} />
          <Route path='/delete_day' element={<DeleteDay />} />
      </Routes>
    </div>
  </BrowserRouter>  
    )
}

export default App;
