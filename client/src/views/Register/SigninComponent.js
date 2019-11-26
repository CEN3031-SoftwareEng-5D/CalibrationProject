import fetch from 'isomorphic-fetch';
import {API} from '../config';
import { Route, Switch, Redirect,withRouter  } from 'react-router-dom';
import {BrowserRouter as Router, Link, Navlink} from 'react-router-dom';
import React, {useState}from 'react';
import {signin} from './actions';
const SigninComponent = () =>
{
    const [values,setValues] = useState
    ({
        email: '',
        password:'',
        uuid:'',
        error: '',
        loading:false,
        message: '',
        showForm: true,
    })
    const {email,password,uuid,error,loading,message,showForm} = values
    //on submission check evenet
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        // console.table('handle submit',{email,password,confirm_pass,error,loading,message,showForm});
        setValues({...values,loading:true, error:false})
        const user = {email,password,uuid} ;
        signin(user)
            .then(data => {
                if(data.error)
                {
                    setValues({...values,error: data.error,loading:false})
                }
                    else{
                        setValues({...values,email:'',password:'',uuid:'',error:'',loading:false,message:data.message,showForm:false});
                        //save user token to cookie,
                        //user info to local storage
                        //authenticate user
                    }
            });
    };
    //change in textboxes
    const handleChange = email => e => 
    {
        setValues({...values,error:false, [email]: e.target.value});
    };

    //this is for loading
    const showLoading = () => (loading ? <div className ="alert alert-info">Loading...</div> : '');
    //this is for error
    const showError = () => (error ? <div className ="alert alert-info">{error}</div> : '');
    const showMessage = () => (message ? <div className ="alert alert-info">{message}</div> : '');



    //actual form for data being submitted
    const SigninForm =() =>{
    return (
        <form onSubmit = {handleSubmit}>
            <p>Enter Email</p>
            <div className = "form-group">
                <input value = {email} onChange ={handleChange('email')} type = "email" className = "form-control" placeholder ="Enter Email"></input>
            </div>
            <p>Enter Password</p>
            <div className = "form-group">
                <input value ={password}onChange ={handleChange('password')} type = "password" className = "form-control" placeholder ="Enter Password"></input>
            </div>
            <p>Enter UUID</p>
            <div className = "form-group">
                <input value ={uuid}onChange ={handleChange('uuid')} type = "uuid" className = "form-control" placeholder ="Enter UUID"></input>
            </div>
            <div>
                {/* { <Link to ="/FileUpload"> */}
                <button className = "homeButton">Signin</button>
                 {/* </Link> } */}
                 <Link to ="/Register">
                 <button className = "homeButton">Register</button>
                 </Link>
            </div>
        </form>
)    
}
return<React.Fragment>
    {showError()}
    {showLoading()}
    {showMessage()}
    {showForm && SigninForm()}
    </React.Fragment>
};
export default SigninComponent;