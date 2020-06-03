var tronWeb;
var waiting = 0;
var currentAddr;
var time = 0;
var pottime = 0;



var a_godTimer = "";
var godtimer_in_seconds = 0;
var god_numhours = 0;
var god_numminutes = 0;
var god_numseconds = 0;

var god_roundover = false;
var godtimer_lastminute = 300;
var i_godTimer = true;




async function main() {

    if (typeof(window.tronWeb) === 'undefined') {
        console.log('Waiting for tronWeb...');
        waiting += 1;
        if (waiting == 5) {
        alert('please ensure tronlink is installed and connected ');
        }
        setTimeout(main, 1000);
    } else {
        tronWeb = window.tronWeb;
        Decker = await tronWeb.contract().at("TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS");
        tokenfrag = await tronWeb.contract().at("TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9");
        tokenbankroll = await tronWeb.contract().at("TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK");
        BigNumber = tronWeb.BigNumber;
        currentAddr = tronWeb.defaultAddress['base58'];
        setTimeout(function() {
            $('#check').hide();

        }, 2000);
        setInterval(function() {
            mainloop();
        }, 2000);
    }
}

function nFormatter(num) {
    isNegative = false
    if (num < 0) {
        isNegative = true
    }
    num = Math.abs(num)
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        formattedNumber = num;
    }
    if (isNegative) {
        formattedNumber = '-' + formattedNumber
    }
    return formattedNumber;
}

function fastupdateGodTimer(data) {
    if (i_godTimer == true) {
        var _blocktime = (new Date()).getTime(); //current "blocktime" in milliseconds
        var _timer = data - (_blocktime / 1000);

        if (_timer > 0) {
        godtimer_lastminute = 0;
        var _hours = Math.floor(_timer / 3600);
        if (_hours < 10) {
            _hours = "0" + _hours
        }
        var _minutes = Math.floor((_timer % 3600) / 60);
        if (_minutes < 10) {
            _minutes = "0" + _minutes
        }
        var _seconds = parseFloat((_timer % 3600) % 60).toFixed(0);
        if (_seconds < 10) {
            _seconds = "0" + _seconds
        }


        document.getElementById('timer').innerHTML = _hours + "h : " + _minutes + "m : " + _seconds + 's ';
   
        god_roundover = false;
      } else {
           document.getElementById(doc).innerHTML =  0  + "h : " + 0 + "m : " + 0 + 's ';
 
        
    }
    }
}

function mainloop() {
    if (tronWeb.defaultAddress['base58'] !== currentAddr) {
        location.reload();
    }



    var dataRef = window.location.origin + "?ref=" + tronWeb.defaultAddress['base58']
    document.getElementById('intialAccount').textContent = dataRef;

    Decker.buyPrice().call().then(result => {
        var amount = ((result))
        document.getElementById("buyprice").textContent = (amount / 1e6).toFixed(5);
    });

    Decker.sellPrice().call().then(result => {
        var amount = ((result))
        document.getElementById("sellPrice").textContent = (amount / 1e6).toFixed(5);
    });
    Decker.totalhexBalance(2).call().then(result => {
        var amount = ((result))
        document.getElementById("bb").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.totalhexBalance(0).call().then(result => {
        var amount = ((result))
        document.getElementById("tr").textContent = (amount / 1e6).toFixed(2);
    });
      Decker.potTime().call().then(result => {
        var amount = ((result))
         fastupdateGodTimer(amount);
    });
    
     Decker.totalDividendspaid().call().then(result => {
        var amount = ((result))
         document.getElementById("totalDividendspaid").textContent = (amount / 1e6).toFixed(2); 
    });
    
    
    
  if ($('#fragEnabled').is(':checked')) {
       tokenfrag.balanceOf(currentAddr).call().then(result => {
        var amount = ((result));
        var stat1 = amount;
        document.getElementById("walletApx").textContent = (amount / 1e18).toFixed(5);
        document.getElementById("tn").textContent = "FRAG" ;
        
    });
        
         tokenfrag.allowance(currentAddr,'TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS').call().then(result => {
          var amount = ((result))
        var stat = amount;
         
        if(stat >= 1){
          $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
        
       }
       else{
         
       }
    });
         
    }
    
     if ($('#bankrEnabled').is(':checked')) {
          tokenbankroll.balanceOf(currentAddr).call().then(result => {
        var amount = ((result));
        var stat1 = amount;
        document.getElementById("walletApx").textContent = (amount / 1e6).toFixed(5);
        document.getElementById("tn").textContent = "BNKR" ;
        
    });
        
         tokenbankroll.allowance(currentAddr,'TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS').call().then(result => {
          var amount = ((result))
        var stat = amount;
         
        if(stat >= 1){
          $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
        
       }
       else{
         
       }
    });
         
    }
   
     
    Decker.totalhexBalance(1).call().then(result => {
        var amount = ((result))
        document.getElementById("fb").textContent = (amount/1e18).toFixed(2);
    });
    Decker.HexContractBalance().call().then(result => {
        var amount = ((result))
        document.getElementById("HexContractBalance").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.totalSupply().call().then(result => {
        var amount = ((result))
        document.getElementById("totalSupply").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.totalPlayers().call().then(result => {
        var amount = ((result))
        document.getElementById("totalPlayers").textContent = (amount);
    });
    Decker.jackpotFund().call().then(result => {
        var amount = ((result))
        document.getElementById("jackpotFund").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.potWinner().call().then(result => {
        var amount = ((result.toString()))
        document.getElementById("potWinner").textContent = (amount);
    });
    Decker.myDividends(currentAddr).call().then(result => {
        var amount = ((result))
        document.getElementById("myDividends").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.myTokens().call().then(result => {
        var amount = ((result))
        document.getElementById("myTokens").textContent = (amount / 1e6).toFixed(2);
    });
    Decker.myDividends(currentAddr).call().then(result => {
        var amount = ((result))



        if ($('#trxEnabledW').is(':checked')) {

            document.getElementById("datapx").textContent = (amount / 1e6).toFixed(2);

        } else if ($('#fragEnabledW').is(':checked')) {
            var data2 = amount / 2.8;
            document.getElementById("datapx").textContent = (data2 / 1e6).toFixed(2);

        } else {
            var data3 = amount / 3;
            document.getElementById("datapx").textContent = (data3 / 1e6).toFixed(2);

        }


    });




}


$('#trxEnabled').click(function() {
    document.getElementById("fragEnabled").checked = false;
    document.getElementById("trxEnabled").checked = true;
    document.getElementById("bankrEnabled").checked = false;
    $("#buy").attr("placeholder", "AMOUNT OF TRX TO SPEND");
    
    $('.act').hide();
         $('.buyaction2').show();
         $('.wtab').show();
    
    tronWeb.trx.getUnconfirmedBalance(tronWeb.defaultAddress['base58']).then(result => {
        walletBal = result;
        document.getElementById('walletApx').textContent = (tronWeb.fromSun(result)*1).toFixed(2);
    });
    
     
     document.getElementById("tn").textContent = "TRON" ;
    
     
});
$('#fragEnabled').click(function() {

    document.getElementById("fragEnabled").checked = true;
    document.getElementById("trxEnabled").checked = false;
    document.getElementById("bankrEnabled").checked = false;
    $("#buy").attr("placeholder", "AMOUNT OF FRAG TO SPEND");
     var data = 0 ;
    tokenfrag.allowance(currentAddr,'TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS').call().then(result => {
        var amount = ((result));
        var stat1 = amount;
       // document.getElementById("walletApx").textContent = (amount / 1e6).toFixed(5) ;
       //  document.getElementById("tn").textContent = "FRAG" ;
        if(stat1 == 0){
        $('.act').show();
         $('.buyaction2').hide();
         $('.wtab').hide();
        
       }
       else{
           $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
       }
    });
     tokenfrag.balanceOf(currentAddr).call().then(result => {
        var amount = ((result));
        var stat1 = amount;
        document.getElementById("walletApx").textContent = (amount / 1e18).toFixed(5) ;
         document.getElementById("tn").textContent = "FRAG" ;
        
    });
    
     

});
$('#bankrEnabled').click(function() {
    document.getElementById("fragEnabled").checked = false;
    document.getElementById("trxEnabled").checked = false;
    document.getElementById("bankrEnabled").checked = true;
    $("#buy").attr("placeholder", "AMOUNT OF BNKR TO SPEND");
   
    
    tokenbankroll.allowance(currentAddr,'TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS').call().then(result => {
        var amount = ((result))
        var stat = amount;
        
        if(stat == 0){
        $('.act').show();
         $('.buyaction2').hide();
         $('.wtab').hide();
        
       }
       else{
           $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
       }
    });
    
    tokenbankroll.balanceOf(currentAddr).call().then(result => {
        var amount = ((result));
        var stat1 = amount;
        document.getElementById("walletApx").textContent = (amount / 1e6).toFixed(5);
        document.getElementById("tn").textContent = "BNKR" ;
        
    });
    
    
    
    
    
});


$('#trxEnabledW').click(function() {
    document.getElementById("fragEnabledW").checked = false;
    document.getElementById("trxEnabledW").checked = true;
    document.getElementById("bankrEnabledW").checked = false;
    // $("#buy").attr("placeholder", "AMOUNT OF TRX TO SPEND");
    document.getElementById("tokenwithdraw").textContent = 'TRON';
});
$('#fragEnabledW').click(function() {

    document.getElementById("fragEnabledW").checked = true;
    document.getElementById("trxEnabledW").checked = false;
    document.getElementById("bankrEnabledW").checked = false;
    //$("#buy").attr("placeholder", "AMOUNT OF FRAG TO SPEND");
    document.getElementById("tokenwithdraw").innerHTML = 'FRAG';

});
$('#bankrEnabledW').click(function() {
    document.getElementById("fragEnabledW").checked = false;
    document.getElementById("trxEnabledW").checked = false;
    document.getElementById("bankrEnabledW").checked = true;
    // $("#buy").attr("placeholder", "AMOUNT OF BNKR TO SPEND");
    document.getElementById("tokenwithdraw").textContent = 'BANKROLL';

});



function approve(){
    
  if ($('#fragEnabled').is(':checked')) {
       
        tokenfrag.approve('TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS', '100000000000000000000000' ).send({

        }).then(result => {
            callback();
            $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
        }).catch((err) => {
            console.log(err)
        })

    } else {
        tokenbankroll.approve('TXa8bnxAcMwr2KNutWxyu2fbsYEbPWUdjS', 1000000000000).send({

        }).then(result => {
            callback();
           
        }).catch((err) => {
            if(!err){
                 $('.act').hide(); 
            $('.buyaction2').show();
         $('.wtab').show();
            }
            else{
                 console.log(err)
            }
            
           
        })

    }

    
    
    
}





function sell() {

    var _trxneeded = (document.getElementById('sell').value);
    var _amt = _trxneeded * 1e6;
    Decker.sell(_amt).send({

    }).then(result => {


        callback();
    }).catch((err) => {
        console.log(err)
    });

}

function reinvest() {


    Decker.reinvest().send({

    }).then(result => {


        callback();
    }).catch((err) => {
        console.log(err)
    });

}




function withdraw(){




    if ($('#trxEnabledW').is(':checked')) {
        Decker.withdraw(0).send({

        }).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        })

    } else if ($('#fragEnabledW').is(':checked')) {
        Decker.withdraw(1).send({

        }).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        })

    } else {
        Decker.withdraw(2).send({

        }).then(result => {
            callback();
        }).catch((err) => {
            console.log(err)
        })

    }



}

function buy() {
    var _trxneeded = (document.getElementById('buy').value);
    var _amt = _trxneeded * 1e6;

    if ($('#trxEnabled').is(':checked')) {
        
        Decker.buy(_amt , 0, ).send({
            callValue: _amt
        }).then(result => {
            callback();
            load100();
        }).catch((err) => {
            console.log(err)
        })
    } else if ($('#fragEnabled').is(':checked')) {
        
        Decker.buy(_trxneeded, 1).send({
            callValue: 0
        }).then(result => {
            callback();
            load100();
        }).catch((err) => {
            console.log(err)
        })
    } else {
        Decker.buy(_amt, 2).send({
            callValue: 0
        }).then(result => {
            callback();
            load100();
        }).catch((err) => {
            console.log(err)
        })
    }


}




$('#buyEggs').on('keyup input', function() {

    var amt = document.getElementById('buyEggs').value;
    var data = amt * 1e6;
    if (data >= 1) {
        Decker.calculateEggBuySimple(data).call().then(result => {
            var calculateEggBuySimple = ((result));
            document.getElementById("calculateEggBuySimple").textContent = calculateEggBuySimple;


            Decker.getHatchCooldown(calculateEggBuySimple).call().then(result => {
                console.log("getHatchCooldown", result);
                var getHatchCooldown = ((result));

                //  console.log("data", data);
                cooldowntimer(getHatchCooldown, 'getHatchCooldown');

            });
        });
    } else {
        document.getElementById("calculateEggBuySimple").textContent = 0;
    }



});




main();