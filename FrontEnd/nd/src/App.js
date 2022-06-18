import './App.css';
import AddTransation from './Components/AddTransation';
import Calender from './Components/Calender';
import NavBar from './Components/NavBar';
import StatusBar from './Components/StatusBar';
import Login from './Login';
import MonthlyBills from './MonthlyBills';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import AllTransactions from './Components/AllTransactions';
import Analytics from './Components/Analytics';
import Homepage from './homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route   exact path="/" element={<Homepage />} />
          <Route  exact path="/login" element={<Login />} />
          <Route  exact path="/monthlybills" element={<MonthlyBills />} />
          <Route  exact path="/analytics" element={ <Analytics />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
