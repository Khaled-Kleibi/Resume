// khaled Kleibi 2040015
const form = $("#myform");
const msg = document.querySelector("#errors");
const msg2 = document.querySelector("#ok");
const gender = ["male","female"];
const service = ["Website development","Compititve programming training"];

// submit event listener
form.on("submit", e =>{
    let messages = [];

       messages = isFilled("#fname",messages,"first name is empty");
       messages = isFilled("#lname",messages,"last name is empty");
       messages = isWhitelist("#gender",gender ,messages,"gender is not listed");
       messages = isFilled("#mobile",messages,"moblie is empty");
       messages = isMobile("#mobile",messages,"moblie is not matches the format");
       messages = isFilled("#email",messages,"email is empty");
       messages = isEmail ("#email",messages,"email dosen't match the format 'email@uj.com'");
       messages = isWhitelist("#service",service ,messages,"service is not listed");
       messages = isFilled("#details",messages,"details is empty");

    if(messages.length>0){
       msg.innerHTML = messages.length + " issues found: "+ messages.join(", ");
       //prevent the submittion
       e.preventDefault();
   }else{
        msg.innerHTML = "";
        msg2.innerHTML="thanks, we will get in touch ASAP XD";
        
   }
   }
)

//event listener for focus on fname text filed
$("#fname").focus(function(){
    let msg = $("#fnameLabel");
    msg.html("please make sure to not leave this empty :)");
    msg.css("font-size","0.8em");
    msg.css("color","gray");
})

$("#fname").focusout(function(){
    let msg = $("#fnameLabel");
    msg.html("");
    if (!$(this).val()){
        msg.html("you left this empty! come back again");
        msg.css("font-size","0.8em");
        msg.css("color","red");
    }
})

$("#lname").focus(function(){
    let msg = $("#lnameLabel");
    msg.html("please make sure to not leave this empty :)");
    msg.css("font-size","0.8em");
    msg.css("color","gray");
})

$("#lname").focusout(function(){
    let msg = $("#lnameLabel");
    msg.html("");
    if (!$(this).val()){
        msg.html("you left this empty! come back again");
        msg.css("font-size","0.8em");
        msg.css("color","red");
    }
})

//check if the element empty or not
function isFilled(selector,messages,msg){
    const element = document.querySelector(selector).value.trim();
    if(element.length<1){
        messages.push(msg);
    }
    return messages;
}

function isEmail(selector, messages,msg){
    const element = document.querySelector(selector).value.trim();
   if(!element.match("[A-Za-z0-9]+@[a-z]+\.[a-z]{2,4}")){
        messages.push (msg);
    }
    return messages;
}

function isMobile(selector, messages, msg){
    const element = document.querySelector(selector).value.trim();
   if(!element.match("[0-9]{10}")){
        messages.push (msg);
    }
    return messages;
}

function isWhitelist (selector, whiteList, messages, msg){
    const element = document.querySelector(selector).value.trim();
    if(!whiteList.includes(element)){
        messages.push(msg);
    }
    return messages;
}