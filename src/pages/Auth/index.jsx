import { auth, provider } from "../../Config/FirebaseConfig"
import { signInWithPopup } from "firebase/auth"
import { useNavigate, Navigate } from "react-router-dom";
import {useGetUserInfo} from "../../Hooks/useGetUserInfo";

export const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo()
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth:true,
            email: results.user.email,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker");
        console.log(results);
    }

    if(isAuth) {
        return <Navigate to="/expense-tracker" />
    }
    
    return <div className="login-page">
        <p>Sign in with Google</p>
        <button className="login-with-google-btn btn btn-primary" onClick={signInWithGoogle}>Login using Google</button>
    </div>
}