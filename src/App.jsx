import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignInPage from "./pages/AuthPage/SignInPage.jsx";
import SignUpPage from "./pages/AuthPage/SignUpPage.jsx";
import VerificationPage from "./pages/AuthPage/VerificationPage.jsx";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage.jsx";


export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/signin" element={<SignInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/signup/verification" element={<VerificationPage/>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </>
    )
}
