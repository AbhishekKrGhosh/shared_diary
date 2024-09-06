import PrivateAccountRoute from "./components/PrivateRoutes/PrivateAccountRoute"
import PrivateAccountRoute2 from "./components/PrivateRoutes/PrivateAccountRoute2"
import PrivateAccountRoute3 from "./components/PrivateRoutes/PrivateAccountRoute3"
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute"
import AccountByOthers1 from "./pages/AccountByOthers/AccountByOthers1"
import AccountByOthers2 from "./pages/AccountByOthers/AccountByOthers2"
import Home from "./pages/Home/Home"
import Home2 from "./pages/Home/Home2"
import Main from "./pages/Main/Main"
import SignIn1 from "./pages/SignIn/SignIn1"
import SignIn2 from "./pages/SignIn/SignIn2"
import SignUp1 from "./pages/SignUp/SignUp1"
import SignUp2 from "./pages/SignUp/SignUp2"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn1/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home2" element={<Home2/>}/>
      <Route path="/main" element={<Main/>}/>
      </Route>
      <Route path="/sign-in" element={<SignIn1/>}/>
      <Route element={<PrivateAccountRoute/>}>
      <Route path="/sign-in-step2" element={<SignIn2/>}/>
      </Route>
      <Route path="/sign-up" element={<SignUp1/>}/>
      <Route element={<PrivateAccountRoute2/>}>
      <Route path="/sign-up-step2" element={<SignUp2/>}/>
      </Route>
      <Route path="/create-by-others" element={<AccountByOthers1/>}/>
      <Route element={<PrivateAccountRoute3/>}>
      <Route path="/create-by-others-sign-up" element={<AccountByOthers2/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
