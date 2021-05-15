import React from 'react';
class Header extends React.Component{
    constructor(){
    super();
};    

render(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-primary" >
            <a className="navbar-brand ml-5" href="/">Infy Express</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end mr-5" id="navbarSupportedContent">
                <ul className="navbar-nav mr-5">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/listofservices">List of Service</a>
                </li>
                {this.props.authenticated?
                <li className="nav-item active">
                <a className="nav-link" href="/profile">Profile</a>
                </li>
                :
                <li className="nav-item active">
                    <a className="nav-link" href="/login">Login</a>
                </li>}
                </ul>
            </div>
        </nav>
    );
}
}
export default Header;