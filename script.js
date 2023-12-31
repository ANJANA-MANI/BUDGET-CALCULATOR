id=0;
ex=0;
function register()
{
    

    if(uname.value in localStorage)
    {
        alert("User is already registered!");
    }
    else{
        user={
            Name:uname.value,
            Email:email.value,
            Password:password.value,
            Balance:0.0,
            Spent:0.0,
            Income:{},
            Expense:{}
           
            }
        
        localStorage.setItem(uname.value,JSON.stringify(user));
        alert("Registration Successfull")
    }
     

}
function redirect_login()
{
    window.location='./index.html';  
}
function login()
{
    if((uname.value!="")&&(uname.value in localStorage))
    {
        pass=password.value;
        console.log(pass);
        data=localStorage.getItem(uname.value)
        user=JSON.parse(data);
        if(user.Password===pass)
        {
            
            alert("login Successfull")
            window.location=`./home.html?userId=${uname.value}`;
           

        }
        else{
            alert("Wrong Password")
        }
    }
    else{
        alert("Invalid Username");
    }
}
function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
  }
  function calculate_date()
  {

     var currentDate = new Date();
     date_String = currentDate.toString();
     var dateStringWithoutGMT = date_String.substring(0, date_String.indexOf('GMT'))
   
     return dateStringWithoutGMT;
  }
function income()
{
   
username=getUserIdFromURL();
element1=document.getElementById("income");
e1=element1.value;
element2=document.getElementById("income_amount");
e2=element2.value;
data=localStorage.getItem(username);
 new_data=JSON.parse(data);
 new_data.Balance+=Math.floor(e2)
console.log(new_data.Balance);
id++;
if((e1!="")||(e2!=""))
{
new_data.Income[id]={Type:e1,Amount:Math.floor(e2),balance:new_data.Balance,date_time:calculate_date()}

updated_data=JSON.stringify(new_data);
localStorage.setItem(username,updated_data)
 alert("Your amount is successfully added");
 rotateSpan();
 
 total_balance.innerHTML=`Rs.${new_data.Balance}`
 total_expense.innerHTML=`Rs.${new_data.Spent}`
 result_income.innerHTML+=`<tr>
 <td> ${new_data.Income[id].Type}</td>
 <td>+${new_data.Income[id].Amount}</td>
 <td>${new_data.Income[id].balance}</td>
 <td>${new_data.Income[id].date_time}</td>
   </tr>`
   chart();
}
else{
  alert("pleae enter valid inputs");
}
}
function rotateSpan() {
    var span = document.getElementById("total_balance");
  
    // Add the spin-animation class to trigger the sideways spin
    span.classList.add("spin-animation");
  
    // After a short delay, remove the spin-animation class
    setTimeout(function () {
      span.classList.remove("spin-animation");
    }, 1000); // Set the delay to match the spin animation duration
  }
  function rotateSpan2() {
    var span = document.getElementById("total_expense");
  
    // Add the spin-animation class to trigger the sideways spin
    span.classList.add("spin-animation");
  
    // After a short delay, remove the spin-animation class
    setTimeout(function () {
      span.classList.remove("spin-animation");
    }, 1000); // Set the delay to match the spin animation duration
  }
function expense()
{
ex++;
username=getUserIdFromURL();
console.log("remove");
console.log(username);
element1=document.getElementById("expense");
e1=element1.value;
element2=document.getElementById("expense_amount");
e2=element2.value;

if((e1!="")||(e2!=""))
{
data=localStorage.getItem(username);
console.log(data);
 new_data=JSON.parse(data);
 
 new_data.Spent+=Math.floor(e2);
 new_data.Balance-=Math.floor(e2);
 new_data.Expense[ex]={Type:e1,Amount:Math.floor(e2),balance:new_data.Balance,date_time:calculate_date()}
 updated_data=JSON.stringify(new_data);
 localStorage.setItem(username,updated_data)
 alert("Expense added sucessfully")
 rotateSpan2();
 total_balance.innerHTML=`Rs.${new_data.Balance}`
 total_expense.innerHTML=`Rs.${new_data.Spent}`
 result_expense.innerHTML+=`<tr>
 <td> ${new_data.Expense[ex].Type}</td>
 <td>-${new_data.Expense[ex].Amount}</td>
 <td>${new_data.Expense[ex].balance}</td>
 <td>${new_data.Expense[ex].date_time}</td>
   </tr>`
   chart();
   
}
else{alert("Please enter valid inputs")}

}
function clear_ALL()
{
    console.log("Clear ALLL");
    id=getUserIdFromURL();
     
     data=localStorage.getItem(id);
     console.log(data);
     data2=JSON.parse(data)

    if (data2.Income) {
  for (let key in data2.Income) {
    if (data2.Income.hasOwnProperty(key)) {
      delete data2.Income[key];
      
    }
  }
}

    if (data2.Expense) {
  for (let key in data2.Expense) {
    if (data2.Expense.hasOwnProperty(key)) {
      delete data2.Expense[key];
      
    }
  }
}
data2.Balance=0;
data2.Expense=0;
data2.Spent=0;
localStorage.setItem(id,JSON.stringify(data2));
result_expense.innerHTML="";
result_income.innerHTML="";
total_balance.innerHTML="";
total_expense.innerHTML="";
clear=document.getElementsByTagName('input')
clear_array=[...clear];
clear_array.map(i=>i.value="");
    g=document.getElementsByClassName('graph')
  

//ADD DELETE OPERATOR
    
}
function chart()
{
  var ctx =document.getElementById('myPieChart').getContext('2d') ;
// Check if there's an existing chart instance
var existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
}
  data=JSON.parse(localStorage.getItem(getUserIdFromURL()))
  console.log(data);
  const incomeTypes = Object.values(data.Income).map(income => income.Type);
  const incomeAmounts = Object.values(data.Income).map(income => income.Amount);

  // Extracting expense types and amounts for the pie chart
  const expenseTypes = Object.values(data.Expense).map(expense => expense.Type);
  const expenseAmounts = Object.values(data.Expense).map(expense => expense.Amount);

  // Creating a pie chart
  //const ctx = document.getElementById('myPieChart').getContext('2d');
  const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [...incomeTypes, ...expenseTypes],
      datasets: [{
        data: [...incomeAmounts, ...expenseAmounts],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)', // Income color
          'rgba(255, 99, 132, 0.8)', // Expense color
          // Add more colors as needed
        ],
      }],
    },
  });
}