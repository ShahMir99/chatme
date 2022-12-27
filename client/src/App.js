import "./App.css";
import { Routes, Route , Navigate} from "react-router-dom";
import {useSelector} from "react-redux"
import Auth from "./Pages/Auth/Auth";
import Chats from "./Pages/Chats/Chats";

function App() {

  const {authData} = useSelector((state) => state.auth)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={authData ?  <Navigate to='/chats'/> : <Auth />}/>
        <Route path="/chats" element={authData ? <Chats /> : <Navigate to='/'/> }/>
      </Routes>
    </div>
  );
}

export default App;
