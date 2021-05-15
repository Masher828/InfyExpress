import React from 'react';
import image from '../images/image.jpeg'
import checklist from '../images/checklist.png'
import deliveryguy from '../images/delivery_guy.png'
import doordelivery from '../images/doordelivery.png'
import dock from '../images/dock.png'
class Home extends React.Component{

    constructor(){
        super();
        this.state={};
    }

    render(){
        return(
            <>
            <div className="row ml-5 mr-4">
                <div className="col-md-6 col-xs-12">
                    <h1><span style={{borderBottom:"1px solid red", color:"teal"}} >Infy Express</span></h1>
                    <p className="mt-5" >
                        With Infy Express, We aim to make the entire package delivery experience straightforward
                         - proiding online tools for shipping, monitoring and tracking; lending out experience in 
                        customs clearance and keeping abreast of all the latest rules and regulations, duties and taxes.
                    </p>
                    <button className="btn btn-danger mb-2 mt-2"><a style={{textDecoration:"none", color:"white"}} href="/listofservices">Want to book a service?</a></button>
                </div>
                <div className="col-md-6 col-xs-12">
                    <img src={image} height="250vh" width="100%"/>
                </div>
            </div>
            <div className="text-center p-5" style={{backgroundColor:"#DCDCDC"}}>
                <h4><span style={{borderBottom:"1px solid red", color:"teal"}} >The Process</span></h4>   
                <div className="row mr-5 mt-5" >
                <div className=" col-10 offset-4 col-sm-4 offset-sm-2 col-md-4 col-lg-2 mb-4 offset-lg-1 offset-md-2">
                <div className="card home-card pr-3 pl-0 pb-0" style={{width:"10em"}}>
                <img className="card-img-top" height="120vh" src={checklist} alt="Card image cap" />
                <div className="card-body pb-0">
                <p className="card-title"><strong>TAKING THE ORDER</strong></p>
                </div>
                </div>
                </div>
                <div className="col-10 offset-4 col-sm-4 offset-sm-2 col-md-4 col-lg-2 mb-4 offset-lg-1 offset-md-2">
                <div className="card home-card pr-0 pl-0 pb-0" style={{width:"10em"}}>
                <img className="card-img-top responsive" src={deliveryguy} height="120vh" alt="Card image cap" />
                <div className="card-body pb-0">
                <p className="card-title"><strong>TAKING THE ORDER</strong></p>
                </div>
                </div>
                </div>
                <div className="col-10 offset-4 col-sm-4 offset-sm-2 col-md-4 col-lg-2 mb-4 offset-lg-1 offset-md-2">
                <div className="card home-card pr-0 pl-0 pb-0" style={{width:"10em"}}>
                <img className="card-img-top responsive" src={dock} height="120vh" alt="Card image cap" />
                <div className="card-body pb-0">
                <p className="card-title"><strong>TAKING THE ORDER</strong></p>
                </div>
                </div>
                </div>
                <div className="col-10 offset-4 col-sm-4 offset-sm-2 col-md-4 col-lg-2 mb-4 offset-lg-1 offset-md-2">
                <div className="card home-card pr-0 pl-0 pb-0" style={{width:"10em"}}>
                <img className="card-img-top responsive" src={doordelivery} height="120vh" alt="Card image cap" />
                <div className="card-body pb-0">
                <p className="card-title"><strong>TAKING THE ORDER</strong></p>
                </div>
                </div>
                </div>
                </div>
            </div>
        </>
        );
    }
}

export default Home;