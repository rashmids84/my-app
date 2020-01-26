import React , {Component} from 'react';
import HomeNav from './Homenav';

 export default class BillingReportTable extends React.Component {

  constructor(){
   super();
   this.displaySessionIDApiKey1 = this.displaySessionIDApiKey1.bind(this);
   this.displayTableData = this.displayTableData.bind(this);

   this.getHeader = this.getHeader.bind(this);
   this.getRowsData = this.getRowsData.bind(this);
   this.getKeys = this.getKeys.bind(this);

   this.state = {
     stateTableData : []
   }
  
 }
 
 getKeys = function(){
  // console.log("BRT:getKeys");
 
  console.log("BRT:Get Keys:",this.state.stateTableData[0])
  if (this.state.stateTableData[0] != null){
  return Object.keys(this.state.stateTableData[0]);
  }
}

getHeader = function(){
  // console.log("BRT:getHeader");
  console.log("BRT:Get Header:",this.state.stateTableData);
  
  if (this.state.stateTableData[0] != null){
  var keys = this.getKeys();
 
  return keys.map((key, index)=>{
    return <th key={key}>{key.toUpperCase()}</th>
  })
}
}

getRowsData = function(){
  // console.log("BRT:Inside getRowsData");
  if (this.state.stateTableData){
  var items = this.state.stateTableData;
  var keys = this.getKeys();
  return items.map((row, index)=>{
    return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
  })
}
}

  displaySessionIDApiKey1 = async () => 
  {
    // this.setState(sessid_LS,apikey_LS);
    // console.log("BRT:Inside Button");

    // e.preventdefault();
    // console.log("BRT:Before");
    const sessid_LS = localStorage.getItem('sessionid_LS');
    const apikey_LS = localStorage.getItem('apiKey_LS');
  
    // this.setState(sessid_LS,apikey_LS);

    // console.log("BRT:Session ID:",sessid_LS);
    // console.log("BRT:API Key:",apikey_LS);
    localStorage.removeItem('sessionid_LS');
    localStorage.removeItem('apiKey_LS');

    // return 'A';



            var myHeaders = new Headers();
            myHeaders.append("SessionId", sessid_LS );
            myHeaders.append("APIKey", apikey_LS );
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({"Start_Date":"2020-01-01","End_Date":"2020-01-24","Interval":"Daily","Dimension":"","Filters":"-1","Imp_Start":"0","Imp_End":"100000000000"});
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            // console.log("BRT:Rashmi Header:",myHeaders);
            // console.log("BRT:Rashmi Data:",raw);
            // console.log("BRT:State Data:",this.state.Data);

            try {
              const respData = await fetch("http://api6.audiencelogy.com/adx_reporting/billingReport", requestOptions);
              const respData2 = await respData.json();
              // console.log("BRT:BillingAPI JSON O/P:",respData2);
              // this.setState(respData2);
              this.state.stateTableData = respData2.Data;
              this.stateTableData = JSON.stringify(this.stateTableData);
              console.log("BRT:BillingAPI O/P:", this.state.stateTableData);
              this.setState({stateTableData: respData2.Data});

              // const sessionID = respData2.session_id;
              // const apikey = respData2.apikey;
              // console.log("BRT:Rashmi After Api:",sessionID);

              return respData2.Data;
              // if (sessionID != null){
              //   console.log("BRT:Rashmi - Inside Session ID");
              //   // SessionForm.CallBillingReportAPI(sessionID,apikey);
              //   localStorage.setItem('sessionid_LS', sessionID);
              //   localStorage.setItem('apiKey_LS', apikey);
                return ;
              // }

            } catch (error) {
              console.log("BRT:Rashmi Error");
              const errors = {...this.state.errors};
              errors.username = error.response.data;  
            }
           
  }

  displayTableData = async () => {
    // console.log("BRT:displayTableData Called");  
    const TableData = await this.displaySessionIDApiKey1(); // (respData2.Data)
      // console.log("BRT:displayTableData Funct B4:", TableData);
      
      // const Rashmi = this.getHeader();
      // const Deepak = this.getRowsData();
      // console.log("BRT:displayTableData Header:", Rashmi);
      // console.log("BRT:displayTableData Detail:", Deepak);
      // const returnValue = `<thead><tr>${Rashmi}</tr></thead><tbody>${Deepak}</tbody>`
      // console.log("BRT:displayTableData Return",returnValue);
      // return returnValue;

      var returnValue = "<table><tr><th>";
    //  var tempString = TableData[0].
  }

  

render(){
  // const a = this.displaySessionIDApiKey1;
  // a();
  // const sessid_LS = localStorage.getItem('sessionid_LS');
  //   const apikey_LS = localStorage.getItem('apiKey_LS');
  //   console.log("BRT:Render1:",sessid_LS);
  //   console.log("BRT:Render2:",apikey_LS);

  // console.log("BRT:B4 Render:", this.state.stateTableData);
  // this.displayTableData(); 
  //  console.log("BRT:Render:", this.state.stateTableData);

  return (
    <div>
      <HomeNav />
        
    <table>
        <tr>
          <th>cpm</th>
          <th>imps</th> 
          <th>bae</th>
        <th>bs</th>
        </tr>
        <tr>
        <td>0.067</td>
        <td>17</td>
        <td>0</td>
        </tr>
        <tr>
        <td>0.0259</td>
        <td>1779</td>
        <td>0</td>
        </tr>
        <tr>
        <td>0.0429</td>
        <td>5</td>
        <td>0</td>
        </tr>
        <tr>
        <td>0.1</td>
        <td>4</td>
        <td>0</td>
        </tr>
    </table>

  </div>

        
  
  )
}
}

const RenderRow = () => {
  return this.state.stateTableData.keys.map((key, index)=>{
    return <td key={this.state.stateTableData.data[key]}>{this.state.stateTableData.data[key]}</td>
  })
}