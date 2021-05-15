import React from 'react';
import person from '../images/person.svg';
import lock from '../images/lock.svg';

class Login extends React.Component{

    constructor(){
        super();
        this.state={
            username : "",
            password : "",
            error: {
                username : false,
                password : false
            }
        }
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    validateForm = ()=>{
        
        let username = false, password = false, check=true;
        if (!(this.state.username.length<31 && this.state.username.length>2)){
            check = false
            username = "Length of username should be between 2 and 31";
        }
        if (!(this.state.password.length<31 && this.state.password.length>8)){
            check = false;
            password = "Length of username should be between 7 and 31";
        }
        this.setState({error:{username:username, password:password}});
        return check;
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if (this.validateForm()){
            this.props.loginUser({username:this.state.username, password:this.state.password});
        }
    }
    render(){
        console.log(this.props.error)
        return(<>
            <div className="container">
            <div className="card m-5" style={{borderRadius:"20px"}}>
                <div className="card-body">
                
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6">
                            
                        </div>
                        <div className="col-10 offset-3 col-sm-10 offset-sm-2 col-md-6 offset-md-0">
                            <h2 className="text-center mb-5 mt-5"><span  style={{borderBottom:"2px solid orange"}}>LOGIN</span></h2>
                            {this.props.error? <div class="alert alert-danger" role="alert">
                            {this.props.error.err}
                            </div>
                        :null}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="usernameprepend"><img src={person}/></span>
                                    </div>
                                    <input name="username" type="text" className={this.state.error.username ? "form-control is-invalid" : "form-control"} value ={this.state.username} onChange={this.handleChange} id="username" placeholder="Username" aria-describedby="usernameprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.username}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="password">Password</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="passwordprepend"><img src={lock}/></span>
                                    </div>
                                    <input name="password" type="password" className={this.state.error.password ? "form-control is-invalid" : "form-control"} value ={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" aria-describedby="passwordprepend" required />
                                    <div className="invalid-feedback">
                                    {this.state.error.password}
                                    </div>
                                </div>
                            </div>
                            <center>
                                {this.props.isLoading?
                                <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>:
                                <button type="submit" className="btn btn-primary mt-3 mb-2">Login</button>
                                }
                                <p>Don't have an account? <a href="/register" style={{textDecoration:"None"}}>Create new</a></p>
                            </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>);
    }
}

export default Login;