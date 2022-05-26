
import './App.css';
import AddTransation from './Components/AddTransation';
import Calender from './Components/Calender';
import NavBar from './Components/NavBar';
import StatusBar from './Components/StatusBar';

function HomePage() {
  return (
    <div className="App">
      <NavBar/>
      <StatusBar/>
      <Calender/>
      
      <AddTransation/>
    </div>
  );
}

export default HomePage;
