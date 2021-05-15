import React from 'react';

import doordelivery from '../images/doordelivery.png'

class Service extends React.Component{
    constructor(){
        super();
        this.state={
            from:"",
            to:"",
            weight:"",
            length:"",
            breadth:"",
            height:"",
            rname:"",
            sname:"",
            rcontact:"",
            scontact:"",
            datetime:"",
            scountry:"",
            rcountry:"",
            rcity:"",
            scity:"",
            raddr:"",
            saddr:"",
            rzip:"",
            szip:""
        };
        
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmitQuote = (e) =>{
        e.preventDefault();
        this.props.submitQuote({from:this.state.from, to:this.state.to, weight:this.state.weight,
                                length:this.state.length, breadth:this.state.breadth, height:this.state.height});
    }

    handleSubmitBooking = (e)=>{
        e.preventDefault();
        console.log("hi")
        this.props.bookService({rname:this.state.rname, sname:this.state.sname, rcontact:this.state.rcontact,
                                scontact:this.state.scontact,datetime:this.state.datetime,scountry:this.state.scountry,
                                rcountry:this.state.rcountry,scity:this.state.scity, rcity:this.state.rcity,
                                raddr:this.state.raddr, saddr:this.state.saddr,rzip:this.state.rzip,szip:this.state.szip,
                                service:this.props.service._id, user:localStorage.getItem('_id')})
        }
    render(){
                if (this.props.service){
                    return(<div className="row m-5">
                    <div className="col-lg-8 col-xs-12">
                        {this.props.isBookingError? <div className="alert alert-danger" role="alert">
                                {this.props.isBookingError}
                                </div>
                            :this.props.isBooked? <div className="alert alert-success" role="alert">
                            {this.props.isBooked}
                            </div>:null}
                        <h3 className ="mb-4" style={{color:"teal"}}>{this.props.service.name}</h3>
                        <p>{this.props.service.slogan}</p>
                        <h6 className="mb-3 mt-4"><strong style={{borderBottom:"2px solid orange"}}>Parcel Size</strong></h6>
                        Package can size up to {this.props.service.psize} (total dimensions of 3 sides) and {this.props.service.pweight}.
                        <h6 className="mb-3 mt-4"><strong  style={{borderBottom:"2px solid orange"}}>Package Charges</strong></h6>
                        Packages are charged on the basis on their weightand travel distance.
                        <h6 className="mb-5 mt-4"><strong  style={{borderBottom:"2px solid orange"}}>FAQ</strong></h6>
                        <div className="mt-4 mb-3 list-group">
                            <strong><p className="list-group-item list-group-item-action mb-0">When will InfyExpress deliver my parcel</p></strong>
                            <strong><p className="list-group-item list-group-item-action mb-0">What happen if something goes wrong?</p></strong>
                            <strong><p className="list-group-item list-group-item-action mb-0">Can I send envelopes?</p></strong>
                            <strong><p className="list-group-item list-group-item-action mb-0">What should I do if my parcel is delayed or lost?</p></strong>
                            <strong><p className="list-group-item list-group-item-action">When will my parcel be delivered</p></strong>
                        </div>
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" style={{width:"100%"}}>Book Service</button>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" style={{width:"100%"}} aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle"><span style={{borderBottom:"2px solid orange"}}>Booking Form</span></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="from">Sender Name</label>
                                        <input type="text" name="sname" value={this.state.sname} onChange={this.handleChange} className="form-control" id="sname" aria-describedby="sname" placeholder="Sender Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rname">Receiver Name</label>
                                        <input type="text" name="rname" value={this.state.rname} onChange={this.handleChange} className="form-control" id="rname" aria-describedby="rname" placeholder="Receiver Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scontact">Sender Ph.No.</label>
                                        <input type="number" name="scontact" value={this.state.scontact} onChange={this.handleChange} className="form-control" id="scontact" aria-describedby="scontact" placeholder="Sender's Contact" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="rcontact">Receiver Ph.No.</label>
                                        <input type="number" name="rcontact" value={this.state.rcontact} onChange={this.handleChange} className="form-control" id="rcontact" aria-describedby="rcontact" placeholder="Receiver's Contact" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="datetime">Choose time to Pick your Package</label>
                                        <input type="datetime-local" onChange={this.handleChange} className="form-control" name="datetime" value={this.state.datetime} id="datetime" aria-describedby="datetime" />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h6>Sender Address</h6>
                                            <div className="form-group">
                                                <label htmlFor="scountry">Country</label>
                                                <input type="number" name="scountry" value={this.state.scountry} onChange={this.handleChange} className="form-control" id="scountry" aria-describedby="scountry" placeholder="Country" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="scity">City</label>
                                                <input type="number" name="scity" value={this.state.scity} onChange={this.handleChange} className="form-control" id="scity" aria-describedby="scity" placeholder="City" />
                                            </div><div className="form-group">
                                                <label htmlFor="saddr">Address</label>
                                                <textarea type="text" name="saddr" value={this.state.saddr} onChange={this.handleChange} className="form-control" id="saddr" aria-describedby="saddr" placeholder="Address" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="szip">Zip Code</label>
                                                <input type="number" name="szip" value={this.state.szip} onChange={this.handleChange} className="form-control" id="szip" aria-describedby="szip" placeholder="Zip Code" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <h6>Receiver Address</h6>
                                            <div className="form-group">
                                                <label htmlFor="rcountry">Country</label>
                                                <input type="number" name="rcountry" value={this.state.rcountry} onChange={this.handleChange} className="form-control" id="rcountry" aria-describedby="rcountry" placeholder="Country" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="rcity">City</label>
                                                <input type="number" name="rcity" value={this.state.rcity} onChange={this.handleChange} className="form-control" id="rcity" aria-describedby="scity" placeholder="City" />
                                            </div><div className="form-group">
                                                <label htmlFor="raddr">Address</label>
                                                <textarea type="text" name="raddr" value={this.state.raddr} onChange={this.handleChange} className="form-control" id="raddr" aria-describedby="raddr" placeholder="Address" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="rzip">Zip Code</label>
                                                <input type="number" name="rzip" value={this.state.rzip} onChange={this.handleChange} className="form-control" id="rzip" aria-describedby="rzip" placeholder="Zip Code" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="modal-footer">
                                    <button type="submit" onClick={this.handleSubmitBooking} className="btn btn-primary" data-dismiss="modal">Book</button>
                                </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xs-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src={doordelivery} height="200vh"/>
                        </div>
                        <div className="col-12">
                        <div className="card p-0" style={{width:"100%"}}>
                        {this.props.error? <div className="alert alert-danger" role="alert">
                            {this.props.error}
                            </div>
                        :this.props.isSubmitted? <div className="alert alert-success" role="alert">
                        {this.props.isSubmitted}
                        </div>:null}
                            <div className="card-body">
                                <h5 className="card-title text-center mt-2"><span style={{borderBottom:"2px solid orange"}}>Get a Quote..</span></h5>
                                <form onSubmit={this.handleSubmitQuote}>
                                    <div className="form-group">
                                        <label htmlFor="from">From*(Collection)</label>
                                        <input type="text" name="from" value={this.state.from} onChange={this.handleChange} className="form-control" id="from" aria-describedby="pickup" placeholder="Enter your pickup location" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="delivery">To*(Delivery)</label>
                                        <input type="text" name="to" value={this.state.to} onChange={this.handleChange} className="form-control" id="delivery" aria-describedby="delivery" placeholder="Enter your delivery location" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="weight">Weight*</label>
                                        <input type="number" name="weight" value={this.state.weight} onChange={this.handleChange} className="form-control" id="weight" aria-describedby="weight" placeholder="Enter your package weight (in kg)" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dimensions">Enter Parcel Dimensions (in cm)*</label>
                                        <div className="row">
                                            <div className="col-4">
                                            <input type="number" name="length" value={this.state.length} onChange={this.handleChange} className="form-control"  aria-describedby="length" placeholder="Length" />
                                            </div>
                                            <div className="col-4">
                                            <input type="number" name="breadth" value={this.state.breadth} onChange={this.handleChange} className="form-control"  aria-describedby="breadth" placeholder="Breadth" />
                                            </div>
                                            <div className="col-4">
                                            <input type="number" name="height" value={this.state.height} onChange={this.handleChange} className="form-control"  aria-describedby="height" placeholder="Height" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-danger">Submit</button>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>);
                }
                return null;
        
        
        
    }
}

export default Service;