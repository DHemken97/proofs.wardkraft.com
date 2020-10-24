import React, { Component } from 'react';
import logo from '../logo.svg';
import './ProofReview.css';

export class ProofReview extends Component {
  displayName = ProofReview.name

  constructor(props) {
    super(props);
    
    this.state = { loading: true,loadingMessage:"Loading..." };
    this.LoadProof();

  }

  LoadProof = () => {
    this.setState({ loadingMessage:"Loading Proof..." })

    fetch('https://apistaging.wardkraft.com/v2/Proofing/Proof',
    { 
        method: 'get', 
        headers: new Headers({
          'x-api-key': '2239E547-2375-45A6-8036-BF1B7BF9FC35', 
          'ProofId': '4416044E-36AF-484E-8372-7BF0EC94FD7C'
        })
      }
    )
      .then(response => response.json())
      .then(data => {
          this.state.proof = data;
          this.LoadOrderItem(this.state.proof.orderItemId);

      })
  }
  LoadOrderItem = (OrderItemId) => {
    this.setState({ loadingMessage:"Loading Order Item..." })
    fetch('https://apistaging.wardkraft.com/v2/OrderItem?OrderItemId='+OrderItemId,
    { 
        method: 'get', 
        headers: new Headers({
          'x-api-key': '2239E547-2375-45A6-8036-BF1B7BF9FC35'
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ orderItem: data, loading: false });
      })
  }
  

  render() {
    if(this.state.proof == undefined ){
        return this.LoadingScreen();
    }
    if(this.state.orderItem == undefined ){        
        return this.LoadingScreen();
      }
      const showButton = this.state.proof.approvalStatus===1;

      return (
        <div>
            

            
            
            <h2><center> <img src="https://static.wixstatic.com/media/c8c52a_145994d929994a8e8e28bb0ab40216c0~mv2.png/v1/fill/w_550,h_200,al_c,q_85,usm_0.66_1.00_0.01/WK_FamilyLogo.webp"></img></center></h2>

            <h3><center> Proof Approval </center></h3>

            <div className="fontSize">
 
            <center><table className="table">
                    <tr className="border">
                        <th className="header">Job Information</th>

                        <th className="header">Proof Information</th>
                </tr>


                <tr>
                    <td>Distributor:</td>

      <td>Proof Iteration: {this.state.proof.iteration}</td>                 
            
                </tr>
                <tr>
      <td>Job Number: {this.state.orderItem.number}</td>

                    <td>Order Number:</td>

                </tr>
                <tr>
      <td>PO Number:{this.state.orderItem.customerPurchaseOrder.number}</td>

                    <td>Proof Type:</td>
                </tr>
                <tr>
                    <td>Product Name:</td>

                    <td>Proof Sent Date: {this.state.proof.sentDate}</td>
                </tr>
                <tr>
                    <td>Product Number: {this.state.orderItem.customerPurchaseOrder.productNumber}</td>

      <td>Response Received: {this.state.proof.responseDate}</td>
                    </tr>                

                   
                               
                </table></center>
            </div>

            <center>
                <h3><b>Click to review proof files</b></h3>
                <div className="link">

                </div>
            <b></b>
            </center>
            <center>                            
            <h3> Approve/Decline </h3>
            </center>   

            <div className="centerContent"> 
                      
                <h3 className="font"> <input  type="radio" id="reason1" name="reason"/> Approved </h3>
                <h3 className="font"> <input type="radio" id="reason2" name="reason" /> Approved with Changes/No Additional Proof Submitted</h3>
                <h3 className="font"> <input type="radio" id="reason3" name="reason" /> Declined - Submit Revised Proof</h3> 

                    
               
            </div>               
               
             
       

            <div className="texBox">
                <center><label for="comment" /> 
                   
                    <textarea rows="5" cols="65" placeholder="Comments: (required when Proof is Declined or Approved with Changes) "name="description"/>                       
         
                  
                </center>
                <br>
                  </br>
      
                  <center>
      {
        showButton?<input type="submit" value="Submit Proof Status"/>:null
      } </center>            
            </div>

      </div>
    );
  }
  LoadingScreen=() =>{
    return (
      <div className="ProofReview">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
    {this.state.loadingMessage}
          </p>
        </header>
      </div>
    );
  }

}
