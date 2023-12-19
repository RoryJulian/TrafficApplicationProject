alert ("Welcome to the Smart Traffic Newsfeed, where you can get all the updates you need to arrive safe and on time!");

function check(){
var choice = document.getElementById("formAnswer").value;
if(choice=="1"){

    document.getElementById("gameDiv").innerHTML="Thank you for requesting information on roadworks/diversions. Please see affected postcodes: Dublin 3, Dublin 5, Dublin 7.";
    }   

    else if(choice=="2"){
    document.getElementById("gameDiv").innerHTML="Thank you for requesting information on tolled roads. Please see affected postcodes: Dublin 4, Dublin 9.";
    }
    else if(choice=="3"){
    document.getElementById("gameDiv").innerHTML="Thank you for requesting information on high current traffic levels. Please see affected postcodes: Dublin 1.";
    }
    else {alert("Invalid input, please either choose 1, 2, or 3")
    }
}
