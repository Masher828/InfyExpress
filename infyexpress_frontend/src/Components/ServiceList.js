import React from 'react';
class ServicesList extends React.Component{
    constructor(){
        super();
        this.state={
            
        };
    }

    

    render(){
        console.log(this.props)
        if (this.props.services){
            return( <>
                <div className="bg-dark p-5">
                    <h3 className="bottom-left text-white">List of Services</h3>
                </div>
                <div className="container">
                    <div className="m-5">
                        <div className="row mb-4">
                            <div className="col-sm-8 offset-sm-2 text-center">
                                <h3><span style={{borderBottom:"2px solid brown", color:"teal"}} >Infy Express</span></h3>
                                <p>Infy Express is believed in seving the clients at their door step. Out thinking is "The best
                                    certification of a quality is the measurement of the scale of the smile on the customer face
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            {this.props.services.map((service, index)=>{
                                 return(
                                    <div key={service._id}  className="col-lg-3 col-sm-6 mt-3">
                                        <div className="card home-card pr-0 pl-0 text-center" style={{borderRadius:"20px", backgroundColor:"skyblue"}}>
                                            <div className="card-body pb-0">
                                            <a href={'/listofservices/'+service._id} style={{color:"black",textDecoration:"None"}}><p className="card-title"><a style={{textDecoration:"none", color:"black"}} href={"/listofservices/"+service._id}><strong>{service.name}</strong></a></p></a>
                                            <p className="card-text">{service.slogan}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                               
                            })}
                        </div>
                    </div>
                </div>
            </>
    );
        }
        else{
            return null;
        }
    }
}

export default ServicesList;