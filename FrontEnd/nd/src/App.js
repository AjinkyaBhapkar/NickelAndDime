import './App.css';
// import AddTransation from './Components/AddTransation';
// import Calender from './Components/Calender';
// import NavBar from './Components/NavBar';
// import StatusBar from './Components/StatusBar';
import Login from './Login';
import MonthlyBills from './MonthlyBills';
import PageNotFound from './Components/PageNotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
// import AllTransactions from './Components/AllTransactions';
import Analytics from './Components/Analytics';
import Homepage from './homepage';
import ProtectedRoute from './utils/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './app/store'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Routes>
          <Route   exact path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route  exact path="/login" element={<Login />} />
          <Route  exact path="/monthlybills" element={<ProtectedRoute><MonthlyBills /></ProtectedRoute>} />
          <Route  exact path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute> } />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </div>

    </Router>
    </Provider>
  );
}

export default App;
