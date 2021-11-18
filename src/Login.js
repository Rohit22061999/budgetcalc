import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Navigate} from 'react-router-dom'
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import SocialLogin from './Components/SocialLogin';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            flag: 0,
            isVerified: false
        }

    }
    componentDidMount() {
        axios.get("http://localhost:3001/UserDetails").then((res) => {
            this.setState({
                details: res.data,
            })
        })
    }
    onChange() {
        this.setState({ isVerified: true })
        console.log(this.state.isVerified)

    }
    validate() {
        let i = 0;
        let details = this.state.details;
       

        while (i <= Object.keys(details).length) {
            var bytes = CryptoJS.AES.decrypt(details[i].password, 'secret key 123');
            var originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == '') {
                alert("Please fill the fields");
                break;
            }
            if (this.state.isVerified == false) {
                alert("Captcha is not verified")
                break;
            }


            else if ((document.getElementById("email").value == details[i].email) && (document.getElementById("pass").value == originalPassword) && this.state.isVerified == true) {
                this.setState({ flag: 1 })
                alert("Login Succcessfully");
                let ciphertext = CryptoJS.AES.encrypt( document.getElementById("pass").value, 'secret key 123').toString();
                // let arr = {
                //     email: document.getElementById("email").value,
                //     password: ciphertext,
                //     name: details[i].name,
                //     lastname: details[i].lastname,
                //     usename: details[i].userName,
                    // id:details[i].id,
                //     email: details[i].email,
                //     expenditure: details[i].expenditure,
                   
                // }
                console.log(details[i])

                let arr= details[i]
                localStorage.setItem("user", JSON.stringify(arr))
                document.getElementById("email").value = ''
                document.getElementById("pass").value = '';
                break;

            }

            else {
                i++;
                if (i == Object.keys(details).length) {
                    alert("Your details not match , enter correct details");
                    break;
                }
            }
        }
    }



    render() {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {
                            my: '1rem',
                            mx: '10rem',
                            width: '60ch'
                        }
                    }}
                    autoComplete="off"
                >
                    <h1 className="my-2">Log In</h1>
                  
                    <TextField className="filled-basic" id="email" label="Enter your Email" variant="filled" />
                    <TextField className="filled-basic" type="password" id="pass" label="Enter your Password" variant="filled" />
                
                    <ReCAPTCHA
                        sitekey="6LfhexwdAAAAAJRTEw72fnthLBQ_R_-BwYzeAEVA"
                        onChange={() => this.onChange()}
                    />
                    <Button className="mb-5" variant="contained" onClick={() => this.validate()}>LOG IN</Button><br/>
                    <Link to="/register">Register Here</Link>
                </Box>
                <div className="container text-center"><SocialLogin/></div>
                
                {console.log(this.state.details)}
                {this.state.flag == 1 && <Navigate to="/Home" />}
            </div>
        )
    }
}

export default Login
