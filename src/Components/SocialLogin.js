import React from 'react'
import SocialButton from "./SocialButton";
import { SocialIcon } from 'react-social-icons';
import { useNavigate } from 'react-router';
import axios from 'axios'

export default function SocialLogin() {
    let navigate=useNavigate()
    const handleSocialLogin = (user) => {
        console.log(user);
        let details={
            name:user._profile.firstName,
            lastname:user._profile.lastName,
            username:user._profile.id,
            email:user._profile.email,
            expenditure:[],
            budget:0,
            expenses:0,
            password:'',
            savings:0

            
        }
        axios.post(`http://localhost:3001/UserDetails`, details);
     
        localStorage.setItem("user", JSON.stringify(details))
        navigate('/home')

      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
      
    return (
        <div>
            <h2>social login with  </h2>
            <SocialButton
                provider="google"

                appId="315754653859-97efmgnshgrm23u1r1m97fv7gfreiqi3.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
            >
                <SocialIcon network="google" />
                
            </SocialButton>
            
            <div id="user"></div>


        </div>
    )
}
