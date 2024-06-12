import logo from './logo.svg';
import './App.css';
import Login from './login/login';
import Homepage from './homepage/homepage';
import { Provider } from "react-redux";
import { store } from "./store";


function App() {
  return (
    <Provider store={store}>

    <Homepage />
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
