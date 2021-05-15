import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './Home.js';
import { connect } from 'react-redux';
import Login from './Login.js';
import Register from './Register.js';
import Header from './Header.js';
import Footer from './Footer.js';
import ServicesList from './ServiceList.js';
import Service from './Service';
import Profile from './Profile';
import { fetchService, loginUser, cancelBooking, submitQuote, addUser, logoutUser, bookService, fetchBooking } from '../redux/ActionCreators.js';

var mapStateToProps = function(state){
    return {
      service : state.Service,
      user : state.User,
      quote : state.Quote,
      booking : state.Booking,

    };
  }
var mapDispatchToProps = function(dispatch){
    return {
        fetchService : ()=>dispatch(fetchService()),
        submitQuote :(data)=>dispatch(submitQuote(data)),
        addUser: (creds)=>dispatch(addUser(creds)),
        loginUser : (creds)=>dispatch(loginUser(creds)),
        logoutUser : ()=>dispatch(logoutUser()),
        bookService : (data)=>dispatch(bookService(data)),
        fetchBooking : ()=>dispatch(fetchBooking()),
        cancelBooking : (booking_id)=>dispatch(cancelBooking(booking_id))
    }
  }

class MainComponent extends React.Component{
    constructor(){
        super();
        this.state={}
    }
    componentDidMount(){
        this.props.fetchService();
        this.props.fetchBooking();
    }

    render(){
        const ServiceWithId = ({match}) => {
            
            if (this.props.service.services.length>0){
                let service = this.props.service.services.filter((service)=> service._id==match.params.serviceId)[0];
                if (service)
                return(
                    <Service    service= {service} 
                                submitQuote={this.props.submitQuote}
                                isError = {this.props.quote.error}
                                isSubmitted={this.props.quote.isSubmitted}
                                bookService ={this.props.bookService}
                                isBooked ={this.props.booking.isBooked}
                                isBookingError={this.props.booking.isError}/>
                    )
                else
                    return <Redirect to="/" />
            }
            else{
                    return(null);
            }
            
        };
        return(
            <>
                <Header authenticated={this.props.user.isAuthenticated}
                        />
                <Switch>
                    <Route  exact path="/" 
                            component={Home} />
                    {this.props.user.isAuthenticated?null:
                    <>
                    <Route  exact path="/register" 
                        component={()=><Register    authenticated ={this.props.user.isAuthenticated}
                                                    addUser ={this.props.addUser}
                                                    error={this.props.user.err}
                                                    image = {this.props.user.image}
                                                    isLoading={this.props.user.isLoading}
                                                    isRegistered={this.props.user.success}/>}/>
                    <Route  exact path="/login" 
                        component= {()=><Login  authenticated={this.props.user.isAuthenticated} 
                                                error={this.props.user.err} 
                                                loginUser={this.props.loginUser}
                                                isLoading={this.props.isLoading}/>} />
                                        </>
                    }
                    <Route  exact path="/listofservices" 
                            component={()=><ServicesList
                                            services = {this.props.service.services} 
                                            />}/>
                    
                    <Route exact path ="/listofservices/:serviceId" 
                            component={ServiceWithId}/>
                    <Route exact path="/profile"
                            component={()=><Profile 
                                            logoutUser={this.props.logoutUser}  
                                            bookings={this.props.booking.isFetched}
                                            cancel = {this.props.cancelBooking}/>}/>
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));