// what I did in that?
// I have used broswer local Storage to store seat booking and i am accessing
// previously bookedseat from local Storage. 

// I have create key as "seats"  in localStorage.
// and value is ["1","0","0","0","0","0","0","0","0","1",
//               "0","0","0","0","0","0","0","0","1","0", 
//               "0","0","0","0","1","0","0","0","0","0", 
//               "1","0","0","0","0","1","0","0","0","0",
//               "0","0","1","0","0","0","0","1","0","0", 
//               "0","0","0","1","0","0","0","0","0","0",
//               "0","0","0","0","0","0","0","0","0","0",
//               "0","0","0","0","0","0","0","0","0","1"]

//  value size is 80 because coach has 80 seats
// 1 represent seat already booked
// 0 represented seat is empty

//   Green color refered seat booked in cell
//   white color refered seat empty in cell



var noOfseats=document.getElementById("number-of-seats");

var btn=document.getElementById("submitbtn");



var arr=JSON.parse(localStorage.getItem("seats"));

var trainseat=document.querySelectorAll(".train-seat");

var c=0;
var totalseat=80;
var bookedseat=0;

noOfseats.addEventListener('focus',()=>{
    document.getElementById("result").style.visibility="hidden";
    document.getElementById("show").style.visibility="hidden";
    document.getElementById("availabilitystatus").style.visibility="hidden";
})

window.addEventListener("load",()=>{
    console.log(arr);
    
    for(let book of trainseat) {
        console.log(typeof book.innerHTML)
        if(arr[Number(book.innerHTML)-1]=="1"){
            book.setAttribute("id","green")
            bookedseat++;
        }
        else{
          
            book.setAttribute("id","white");
        }
    }
    
    
})


btn.addEventListener('click',()=>{
    
    let findseats=parseInt(noOfseats.value);
    

    console.log(typeof findseats);
     c=checkavailability();
    console.log(c);
    if(c<findseats){
        if(c==0){
          alert('coach is full')
        }
        else
        alert(`only ${c} seats left so you can book only ${c} seats not more than that`)
    }
    else{
        booking(findseats);
        document.getElementById("result").style.visibility="visible";
        document.getElementById("show").style.visibility="visible";
        document.getElementById("availabilitystatus").style.visibility="visible";
    }
})

function booking(seats){
     let booked=[];
     arr.map((info,ind)=>{
       
        if(info==='0'){
            if(seats>0)
            { 
                bookedseat++;
                console.log(ind);
                arr[ind]="1";
                booked.push(ind+1);
                seats--;

            }   
        }
     })
     
        localStorage.setItem("seats",JSON.stringify(arr));
             
        for(let book of trainseat) {
            if(arr[Number(book.innerHTML)-1]=="1")
             book.setAttribute("id","green")
            else{
                book.setAttribute("id","white");
            }
        }
        alert('Your seats booking done');
        document.getElementById("result").innerHTML=`your seat number is ${booked.join(',')}`
        document.getElementById("availabilitystatus").innerHTML=`Availability status: <span id=leftseat>${totalseat-bookedseat} </span>seats is left`


        
}
function checkavailability(){
    
        var count=0;
    arr.map((info)=>{
        if(info==='0'){
            count++; 
        }
    })
    return count;
}