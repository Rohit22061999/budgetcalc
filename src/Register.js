import React, { useRef, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import {Navigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import CryptoJS from 'crypto-js';
export default function Register() {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const uNameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
    const regexname = RegExp(/^[A-Za-z]{3,30}$/);
    const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
    const [data, setData] = useState({
        credData: [],
        isLoggedIn: 0,
        isVerified:false
    })
    const onChange= () => {
        setData({...data,isVerified:true})

    }

    const register = () => {
        if (data.isVerified==true){

        if (document.getElementById("fName").value == '' || document.getElementById("lName").value == '' || document.getElementById("uName").value == '' || document.getElementById("email").value == '' || document.getElementById("pass").value == '' || document.getElementById("cPass").value == ''){
            alert("Please fill all fields")
            
        }
        else if(!regexname.test(document.getElementById("fName").value)){
            alert("invalid first name")
        }
        else if(!regexname.test(document.getElementById("lName").value)){
            alert("invalid last name")
        }
        else if(!regForEmail.test(document.getElementById("email").value)){
            alert("email is not valid")
        }
        else if(!regForPass.test(document.getElementById("pass").value)){
            alert(" a password must be eight characters including one uppercase letter, one special character and alphanumeric characters")
        }
        else if(document.getElementById("pass").value!=document.getElementById("cPass").value){
            alert("Password  not match enter confirm password again");
        }
    
        else {
            let ciphertext = CryptoJS.AES.encrypt(passInput.current.value , 'secret key 123').toString();
            let formData = { name: fNameInput.current.value, lastname: lNameInput.current.value, userName: uNameInput.current.value, email: emailInput.current.value, password:ciphertext ,expenditure:[],budget:0,expenses:0,savings:0};
            setData(data => ({
                // ...data,
                credData: [...data.credData, formData],
            }));
            axios.post(`http://localhost:3001/UserDetails`, formData);
            alert("registered successfully")


        }
    }
    else{
        alert("Captcha is not verified")
    }
    }
    const login = () => {
        setData({ isLoggedIn: 1 })
    }
    return (
        <>
           <Container fluid style={{width:"600px",margin:"70px auto"}}>
               <h1>Hello! Register here</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter first name" ref={fNameInput} id="fName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="Enter Last name" ref={lNameInput} id="lName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="Enter Username" ref={uNameInput} id="uName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="text" placeholder="Enter Email" ref={emailInput} id="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="password" placeholder="Enter Password" ref={passInput} id="pass" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="password" placeholder="Confirm Password" ref={cPassInput} id="cPass" />
                </Form.Group>
                <ReCAPTCHA
                        sitekey="6LfhexwdAAAAAJRTEw72fnthLBQ_R_-BwYzeAEVA"
                        onChange={onChange}
                    />
                <Button className="mx-1" variant="contained" onClick={register} >Register</Button>
            <Button className="mx-1" variant="contained" onClick={login}>Login</Button>
                
            </Form>
            </Container>

  
            {data.isLoggedIn == 1 && <Navigate to="/" />}




        </>
    )
}
