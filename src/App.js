import logo from './logo.svg';
import './App.css';
import Home from './Conteinars/Home/Home';
import About from './Conteinars/Home/About/About';
import Appointment from './Conteinars/Appointment/Appointment';
import Contact from './Conteinars/Home/Contact/Contact';
import Departments from './Conteinars/Departments/Departments'
import Doctors from './Conteinars/Doctors/Doctors';
import { Route, Switch } from 'react-router-dom';
import Headar from './Component/Hedar/Hedar';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <>
      <Headar/>        
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/Departments"} component={Departments} />
        <Route exact path={"/About"} component={About} />
        <Route exact path={"/Doctors"} component={Doctors} />
        <Route exact path={"/Contact"} component={Contact} />
        <Route exact path={"/Appointment"} component={Appointment} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
