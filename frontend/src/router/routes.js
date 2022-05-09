import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import Login from "../pages/login"
import Register from "../pages/register"

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/"} element={<Register/>}/>
            </Routes>
        </Router>
    )
}