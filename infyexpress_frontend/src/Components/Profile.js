import React from 'react';

class Profile extends React.Component{
    constructor(){
        super();
        this.state={};

        this.cancelBooking = this.cancelBooking.bind(this);
    }

    handleLogout=()=>{
        this.props.logoutUser();
    }

    cancelBooking = (id)=>{
        this.props.cancel(id);
    }

    render(){
        return(
            <div className="card container-fluid">
                <h3 className="text-center mb-4" ><span style={{borderBottom:"solid 3px orange"}}>Profile Information</span></h3>
                <div className = "pb-3 mr-3" style={{backgroundColor:"lightblue"}}>
                <div className="row" >
                    <div className="col-6 text-center pt-3">
                        <p>Name</p>
                        <p>Username</p>
                        <p>Contact</p>
                    </div>
                    <div className="col-6 text-center pt-3">
                        <p>Name</p>
                        <p>Username</p>
                        <p>Contact</p>
                    </div>
                </div>
                <center><button className="btn btn-warning btn-md mt-1" style={{width:"100px"}} onClick={this.handleLogout}>Logout</button></center>
                </div>
                <h3 className="text-center mt-4" ><span style={{borderBottom:"solid 3px orange"}}>Booking Information</span></h3>
                <table className="table table-striped table-responsive" style={{width:"100%"}}>
                    <thead>
                        <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Booking Id</th>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Receiver Name</th>
                        <th scope="col">Receiver Phone No.</th>
                        <th scope="col">Cancel Booking</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.bookings?
                        this.props.bookings.map((booking,index)=>{
                            return(<tr key={booking._id}>
                                <th scope="row" >{index}</th>
                                <td>{booking._id}</td>
                                <td>{booking.datetime}</td>
                                <td>{booking.rname}</td>
                                <td>{booking.rcontact}</td>
                                <td><button className="btn btn-danger" onClick={()=>this.cancelBooking(booking._id)}>Cancel Booking</button></td>
                                </tr>);
                        }):null}
                    </tbody>
                    </table>
            </div>
        );
    }
}

export default Profile;