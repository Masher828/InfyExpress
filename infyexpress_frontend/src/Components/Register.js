import React from 'react';
import { Redirect } from 'react-router';
import Resizer from "react-image-file-resizer";
const resizeFile = (file) =>
            new Promise((resolve) => {
                Resizer.imageFileResizer(
                file,
                500,
                500,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
                );
            });
class Register extends React.Component{
    constructor(){
        
        super();
        this.state={
            username : "",
            password : "",
            cpassword : "",
            name:"",
            phone:"",
            profilepic:"",
            error:{
                username : "",
                password : "",
                cpassword : "",
                name:"",
                phone:"",
                profilepic:""
            }
        }
    }

    handleChange = (e)=>{
        if (e.target.name=="profilepic"){
            this.setState({[e.target.name]:e.target.files[0]})
        }
        else{
            this.setState({[e.target.name]:e.target.value})
        }
        
    }

    validateForm = ()=>{
        let check =true,username = false, name=false, password=false,phone=false,profilepic=false;
        if (!(this.state.username.length>2 && this.state.username.length<31)){
            username = "Length of Username should be between 3 and 30";
            check = false;
        }
        if (!(this.state.name.length>2 && this.state.name.length<41)){
            name = "Length of Name should be between 3 and 40";
            check = false;
        }
        if (!(this.state.password==this.state.cpassword)){
            password = "Password does not match";
            check = false;
        }
        if (!(this.state.password.length>7 && this.state.password.length<20)){
            password = "Length of Username should be between 3 and 30";
            check = false;
        }
        if (!(this.state.phone.length>7 && this.state.phone.length<15)){
            phone = "Invalid Phone number";
            check = false;
        }
        if (this.state.profilepic){
            if (!(this.state.profilepic.size<4100000)){
                profilepic = "Image size should be less than 4 mb";
                check = false;
            }
            if (!(this.state.profilepic.name.toLowerCase().match(/\.(jpg|jpeg|gif|png)$/))){
                profilepic = "Invalid File only Images allowed";
                check = false;
            }
        }
        this.setState({error:{
            name : name,
            phone : phone,
            password : password,
            cpassword : cpassword,
            username : username,
            phone : phone,
            profilepic:profilepic
        }});
        return check;
    }
    
    handleSubmit = async (e) =>{
        e.preventDefault();
        if (this.validateForm()){
            const formdata = {}
            formdata["username"] = this.state.username;
            formdata["password"]=this.state.password;
            formdata["name"]=this.state.name;
            formdata["contact"]=this.state.phone;
            if (this.state.profilepic){
                if (this.state.profilepic.size>2000000){

                    try {
                        const image = await resizeFile(this.state.profilepic);
                        formdata["profilepic"]=image;
                        this.props.addUser(formdata);
                      } catch (err) {
                        this.setState({error:{profilepic:"Invalid File only Images allowed"}});
                      }  
                    }  
                    else{
                        formdata["profilepic"]=this.state.profilepic;
                        this.props.addUser(formdata);
                    }            
            }    
            else{
                this.props.addUser(formdata);
            } 
            <Redirect to="/" />
        }
    }

    render(){
        return(
            <div className="container row">
                <div className="col-xs-12 col-sm-12 offset-sm-1 col-md-10 offset-md-2 col-lg-8 offset-lg-3 col-xl-6 offset-xl-4">
                <div className="card m-5" style={{borderRadius:"20px"}}>
                <div className="card-body">
                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 offset-sm-1">
                            <h2 className="text-center mb-5 mt-5"><span style={{borderBottom:"2px solid orange"}}>REGISTER</span></h2>
                            {this.props.error? <div className="alert alert-danger" role="alert">
                            {this.props.error.err}
                            </div>
                        :this.props.isRegistered? <div className="alert alert-success" role="alert">
                        {this.props.isRegistered}
                        </div>:null}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="nameprepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                    </span>
                                    </div>
                                    <input name="name" type="text" className={this.state.error.name ? "form-control is-invalid" : "form-control"} value ={this.state.name} onChange={this.handleChange} id="name" placeholder="Name" aria-describedby="nameprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.name}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="usernameprepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                    </span>
                                    </div>
                                    <input name="username" type="text" className={this.state.error.username ? "form-control is-invalid" : "form-control"} value ={this.state.username} onChange={this.handleChange} id="username" placeholder="Username" aria-describedby="usernameprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.username}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="phoneprepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone-fill" viewBox="0 0 16 16">
                                            <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/>
                                        </svg>
                                    </span>
                                    </div>
                                    <input name="phone" type="number" className={this.state.error.phone ? "form-control is-invalid" : "form-control"} value ={this.state.phone} onChange={this.handleChange} id="phone" placeholder="Contact" aria-describedby="phoneprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.phone}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="password">Password</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="passwordprepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    </span>
                                    </div>
                                    <input name="password" type="password" className={this.state.error.password ? "form-control is-invalid" : "form-control"} value ={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" aria-describedby="passwordprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.password}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="cpasswordprepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                        </svg>
                                    </span>
                                    </div>
                                    <input name="cpassword" type="password" className={this.state.error.password ? "form-control is-invalid" : "form-control"} value ={this.state.cpassword} onChange={this.handleChange} id="cpassword" placeholder="Confirm Password" aria-describedby="cpasswordprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.password}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="profilepic">Profile Picture</label>
                                <div className="input-group">
                                    <input name="profilepic" type="file" className={this.state.error.profilepic ? "form-control is-invalid" : "form-control"} onChange={this.handleChange} id="profilepic" placeholder="Path to Picture" aria-describedby="cpasswordprepend" />
                                    <div className="invalid-feedback">
                                    {this.state.error.profilepic}
                                    </div>
                                </div>
                            </div>
                            <center>
                            {this.props.isLoading?
                                <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                                </div>:
                                <button type="submit" className="btn btn-primary mt-3 mb-2">Submit</button>
                                }                                <p>Already have an account? <a href="/login" style={{textDecoration:"None"}}>Sign In</a></p>
                            </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        );
    }
}

export default Register;