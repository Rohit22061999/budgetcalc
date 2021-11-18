import React, { Component } from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import {Navigate} from 'react-router-dom'
import axios from 'axios';
export class Navi extends Component {
    constructor(props){
        super(props);
        this.state={
            flag:0
        }
    }
    logout=()=>{
        this.setState({flag:1})
        let data=JSON.parse(localStorage.getItem('user'))
        axios.put(`http://localhost:3001/UserDetails/${data.id}`,data)
        localStorage.clear()
        
       
    }
    
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">Paisa Bachaooo</Navbar.Brand>
                        <Nav className="mx-auto text-center">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {/* <Nav.Link href="/changepassword">Change Password</Nav.Link> */}
                            <Nav.Link>Welcome : {this.state.flag==0 && JSON.parse(localStorage.getItem('user')).name}</Nav.Link>
                            <Nav.Link  onClick={this.logout}>Logout</Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
                {this.state.flag==1 && <Navigate to ="/"/>}

            </div>
        )
    }
}

export default Navi