// import logo from './logo.svg';
import './App.css';
// import Home from './Conteinars/Home/Home';
// import About from './Conteinars/Home/About/About';
// import Appointment from './Conteinars/Appointment/Appointment';
// import Contact from './Conteinars/Home/Contact/Contact';
// import Departments from './Conteinars/Departments/Departments'
// import Doctors from './Conteinars/Doctors/Doctors';
import { Route, Switch } from 'react-router-dom';
// import Headar from './Component/Hedar/Hedar';
// import Footer from './Component/Footer/Footer';
// import Auth from './Conteinars/Auth/Auth';
// import Medicine from './Conteinars/Medicine/Medicine';
import Leyout from './Admin/Container/Leyout';
import MedicineAdmin from './Admin/Component/MedicineAdmin';
import DoctorAdmin from './Admin/Component/DoctorAdmin';



// import Loading from './Conteinars/Home/Hoc/Loading';
// import { useEffect, useState } from 'react';

//   const Loadinghome = Loading(Home)

function App() {

  // const [Loading , setLoading] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 2000);
  //   } , [])

  //   console.log(Loading);
  return (
    <>
      {/* <Switch>
      <Loadinghome Loading = {Loading} />
      </Switch> */}
      {/* <Headar /> */}
      {/* <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/Departments"} component={Departments} />
        <Route exact path={"/About"} component={About} />
        <Route exact path={"/Doctors"} component={Doctors} />
        <Route exact path={"/Contact"} component={Contact} />
        <Route exact path={"/Medicine"} component={Medicine} />
        <Route exact path={"/Appointment"} component={Appointment} />
        <Route exact path={"/auth"} component={Auth} />
      </Switch> */}
      {/* <Footer /> */}

      <Leyout>
        <Switch>
          <Route exact path={"/medicineadmin"} component={MedicineAdmin} />
          <Route exact path={"/DoctorAdmin"} component={DoctorAdmin} />
        </Switch>
      </Leyout>

    </>
  );
}

export default App;
