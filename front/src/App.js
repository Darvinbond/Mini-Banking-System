import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MainPage from './pages/MainPage'
import Signup from './pages/Signup'
import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate  ,
  Link
} from "react-router-dom";
import {useSelector} from 'react-redux'
import Transfer from './pages/Transfer';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import PDF from './pages/PDF';
import Transaction from './document/Transaction'
// import { PDFViewer } from '@react-pdf/renderer';  
// import {createStore} from 'redux';
// import allReducers from './reducers'
// import {Provider} from 'react-redux'


function App() {
  const adm = useSelector(state => state.ad)
  const details = useSelector(state => state.detail)
  const loggedIn = Object.keys(details).length > 0
  // const store = createStore(
  //   allReducers,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )

  // let storeData = (coll_data) => {
  //   // window.location.replace("http://localhost:3000/user")
  //   setdata(coll_data)
  // }

  return (
    <div className="h-screen flex flex-col ">
    {/* {details.fname} */}
    {/* <Provider store={store}> */}
    
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/login" element={loggedIn ? <Navigate  to="/user" /> : <Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/user" element={loggedIn ? <Dashboard /> : <Navigate  to="/" />} />
        <Route exact path="/user/transfer" element={loggedIn ? <Transfer /> : <Login/>} />
        <Route path="/user/reciept/:id" element={loggedIn ? <Transaction /> : <Login/>} />
        <Route path="/admin/home" element={adm ? <Admin /> : <AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
    {/* </Provider> */}
    </div>
  );
}

export default App;