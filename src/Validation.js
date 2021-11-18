import React, { Component } from 'react'
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regforName = RegExp(/^[a-z ,.'-]+$/i);
const regforMoblie = RegExp(/^[789]\d{9}$/);
export class Validation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            mobile: null,
            errors: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                mobile: ''

            }
        }
    }
    handler = (event) => {
        const { name, value, } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'name':
                errors.name = regforName.test(value) ? '' : 'name is not valid'
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'Email is not valid';
                break;
            case 'password':
                errors.password = value.length < 8 ? 'Password must me 8 chanrater long' : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword = errors.password == errors.confirmPassword ? '' : "password doesn't";
                break;
            case 'mobile':
                errors.mobile = regforMoblie.test(value) ? 'number should have 10 digits' : '';
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }
    formSubmit = (event) => {
        event.preventDefault();
        if (this.validate(this.state.errors)) {
            alert("Valid Form");
        }
        else {
            alert("Invalid Form");
        }
    }
    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <h2> Form Validation</h2>
                <form onSubmit={this.formSubmit}>
                    Name : <input type="text" name="name" onChange={this.handler} /> {errors.email.length > 0 &&
                        <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                    Email : <input type="text" name="email" onChange={this.handler} /> {errors.email.length > 0 &&
                        <span style={{ color: 'red' }}>{errors.email}</span>}<br />
                    Password : <input type="password" name="password" onChange={this.handler} />
                    {errors.password.length > 0 &&
                        <span style={{ color: 'red' }}>{errors.password}</span>}<br />

                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export default Validation
