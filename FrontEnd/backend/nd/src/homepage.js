
// import AddTransation from './Components/AddTransation';
import AllTransactions from './Components/AllTransactions';
import Calender from './Components/Calender';

import NavBar from './Components/NavBar';
import StatusBar from './Components/StatusBar';
import './homepage.css'



 function Homepage() {
   
   return (
      <div>
         <NavBar />
         <StatusBar />
         <div className='mains'>

            <Calender />
            {/* <AddTransation /> */}
            <AllTransactions />
         </div>
      </div>
   );
}
export default Homepage;