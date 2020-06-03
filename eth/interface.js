 var lucky;

//--------------------------------------Minner--------------------------------------------------
  function Players(callback){
    this.lucky.Players().call().then(result => {
        callback(result);
  });    
}
function Round(callback){
    this.lucky.round().call().then(result => {
        callback(result);
  });    
}
function contractBalance(callback){
    this.lucky.contractBalance().call().then(result => {
        callback(result);
  });    
}

function getRandom(callback){
    this.lucky.getRandom().call().then(result => {
        callback(result);
  });    
}
 
 function countdown(callback){
    this.lucky.countdown().call().then(result => {
        callback(result);
  });    
}
 
 
function address(callback){
   
   myaddress = tronWeb.defaultAddress['base58'];
    console.log("address=" + myaddress);
    document.getElementById('refer').textContent = "https://www.luckyblock.zala.club?ref="+myaddress;
    
}