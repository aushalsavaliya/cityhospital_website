// import logo from './logo.svg';
import './App.css';
import Home from './Conteinars/Home/Home';
// import About from './Conteinars/Home/About/About';
// import Appointment from './Conteinars/Appointment/Appointment';
// import Contact from './Conteinars/Home/Contact/Contact';
// import Departments from './Conteinars/Departments/Departments'
// import Doctors from './Conteinars/Doctors/Doctors';
import { Route, Switch } from 'react-router-dom';
// import Headar from './Component/Hedar/Hedar';
// import Footer from './Component/Footer/Footer';
import Loading from './Conteinars/Home/Hoc/Loading';
import { useEffect, useState } from 'react';

  const Loadinghome = Loading(Home)

function App() {

const [Loading , setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  } , [])

  console.log(Loading);
  return (
    <>
    <Switch>
      <Loadinghome Loading = {Loading} />
      </Switch>
      {/* <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/Departments"} component={Departments} />
        <Route exact path={"/About"} component={About} />
        <Route exact path={"/Doctors"} component={Doctors} />
        <Route exact path={"/Contact"} component={Contact} />
        <Route exact path={"/Appointment"} component={Appointment} />
      </Switch> */}
    </>
  );
}

export default App;
