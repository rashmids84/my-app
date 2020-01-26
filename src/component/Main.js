import React , {Component} from 'react';
import { withRouter } from "react-router-dom";
import logo from '../img15.png';
import './Main.css';
import {Button, Form} from 'react-bootstrap';
import md5 from 'md5';
// import axios from 'axios';
// import HomeNav from '../HomePage/Homenav';
// import SessionForm, {CallBillingReportAPI} from './SessionForm';
// import { browserHistory } from 'react-router';
// import Route from 'react-router-dom';

 class Main extends React.Component
    {
    constructor(props) {
        super(props);
    //     this.state.Data.username = this.state.Data.username.bind(this);
    // }
        this.state = {
              username  : '',
              password  : '',
              user_agent: '',
              ip        :'',
             resultstate :[] ,
             errors: '', 
            }
            // this.changeHandler = this.changeHandler.bind(this);
            this.submitHandler = this.submitHandler.bind(this);
            this.handlePassChange = this.handlePassChange.bind(this);
            this.handleUserChange = this.handleUserChange.bind(this);
       }

        
            // changeHandler = e => {
            //     this.setState({ [e.target.name]: e.target.value })
                
            // }
    
    

            submitHandler = e => {
                e.preventDefault();

                // console.log("Rashmi - submit handler");
                // console.log(this.state);
                this.callAPIAsync();
                // const RetValue = this.callAPIAsync();
                // console.log("API Return Value:",RetValue);
            }
        
            

           callAPIAsync = async () =>{
            // console.log("Rashmi - call API async");
           
           var myHeaders = new Headers();
            myHeaders.append("URL", "admin5.audiencelogy.com");
            myHeaders.append("APIKey", "e0c46ddc4168a98561cc819e0b68b4c6");
            myHeaders.append("Content-Type", "application/json");
            // console.log("Just Password:", this.state.password);
            this.state.password = md5(this.state.password);

            var raw = JSON.stringify(this.state);
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            // console.log("Rashmi Header:",myHeaders);
            // console.log("Rashmi Data:",raw);
            // console.log("Password:", this.state.password);
            // console.log("MD5 Password", md5(this.state.password));

            try {
              const respData = await fetch("http://api6.audiencelogy.com/adxadminapiv4/admin_auth", requestOptions);
              const respData2 = await respData.json();
              // this.setState({resultstate: respData2});
             
              const sessionID = respData2.session_id;
              const apikey = respData2.apikey;
              console.log("Main: Admin Auth Session:",sessionID);
              // console.log("Main State Data:",this.state.Data);

              if (sessionID != null){
                // console.log("Rashmi - Inside Session ID");
                // SessionForm.CallBillingReportAPI(sessionID,apikey);
                localStorage.setItem('sessionid_LS', sessionID);
                localStorage.setItem('apiKey_LS', apikey);
                this.props.history.push('/HomeNav');                
              }

            } catch (error) {
              console.log("Main: Rashmi Error");
              // const errors = {...this.state.errors};
              // errors.username = error.response.data;  
            }

              // .then(response => response.text())              
              // .then(result =>  console.log("Result Success: ",result)) 
              // .catch(error => console.log('Rashmi error: ', error));
              
              //localStorage.setItem('sid', responce.session_id)

            // var data = JSON.stringify(this.state);
            // var xhr = new XMLHttpRequest();
            // xhr.withCredentials = true;
            // xhr.addEventListener("readystatechange", function() {
            //   if(this.readyState === 4) {
            //     console.log(this.responseText);
            //   }
            // });
            // xhr.open("POST", "http://qa-wildfly.audiencelogy.com/adxadminapiv4/admin_auth");
            // xhr.setRequestHeader("URL", "qa.audiencelogy.com");
            // xhr.setRequestHeader("APIKey", "e0c46ddc4168a98561cc819e0b68b4c6");
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.send(data);

           
  }
//   onClick(){
//     //Your code to add user to the list of users
//     browserHistory.push("/HomeNav");
// }

handleUserChange(evt) {
  this.setState({
    username: evt.target.value,
  });
};

handlePassChange(evt) {
  this.setState({
    password: evt.target.value,
  });
}

  
    render() {
      // var { Data } = this.state.Data;

  return (
    <div>
      <div className="row">
        <div className="column">
          <img src={logo} className="App-logo" alt="img" />
        </div>
        
        <div className="column">
          <div className="container">
          <div className="Login">
          <form onSubmit={this.submitHandler} method="post" action="" role="form" class="align-left">
            <div class="text-left"> 
              <Form.Group controlId="formBasic">
                
                <h3 class="#001737 mg-b-5">Admin Console</h3>
                <p class="#8392a5 16px mg-b-40">Welcome back! Please signin to continue.</p>
              </Form.Group>
              </div>
              <div class="text-left"> 
              <Form.Group controlId="formBasicEmail">
                  <Form.Label >Email address</Form.Label>
                  <Form.Control input type="text" value={this.state.username} onChange={this.handleUserChange}/>
                  {/* <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} /> */}
              </Form.Group>
              </div>
              <div class="text-left"> 
              <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control input type="password" value={this.state.password} onChange={this.handlePassChange}/>
                    {/* <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} /> */}
              </Form.Group>
              </div>
              <div class="text-left"> 
              <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              </div>
              <div class="text-left"> 
              
              <Button className="btn-lg btn-block"   type="submit"value="Log In" data-test="submit" > Sign In </Button> 
              
              
              </div>
            </form>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
 }

export default withRouter(Main);