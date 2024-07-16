import logo from './logo.svg';
import './App.css';
import Login from './login/login';
import Homepage from './page/admin/admin';
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Switch, Route, Redirect, createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import NavBarMain from './page/navBarMain/navBarMain';
import WelcomePage from './page/welcome/welcome';
import Footer from './page/footer/footer';
import Axios from '../src/axiosExercise/axios';
import Order from './page/order/order';

// const router = createBrowserRouter([{
//   path:"/",
//   element: <Welcome />,
//   children:[
//     {
//       path: "admin",
//       element: <Homepage />
//     }
//   ]
// }])

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <NavBarMain />
      <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/admin' element={<Homepage />} />
      <Route path='/order' element={<Order />} />
      </Routes>
      <Footer />
      {/* <Axios /> */}
      {/* <Switch> */}
      {/* <Route path="/Welcome" component={Homepage} exact /> */}
      {/* <Homepage /> */}
      {/* <Redirect to="/" />
      </Switch> */}
      
      </BrowserRouter>
      {/* <RouterProvider 
        router={router}
      /> */}
    {/* <Homepage /> */}
    </Provider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
