document.addEventListener('DOMContentLoaded',()=>{
  const expenseform = document.getElementById("expense-form");
  const expensename = document.getElementById("expense-name");
  const expenseamount = document.getElementById("expense-amount");
  const expenselist = document.getElementById("expense-list");
  const total = document.getElementById("total-amount");

  let expenses=JSON.parse(localStorage.getItem('expenses'))||[];//it will show expenses saved in local storage o else it will give empty array
  let totalamount=calculatetotal();

  render();
  expenseform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = expensename.value.trim();
    const amount = parseFloat(expenseamount.value.trim());

    if(name!=="" && !isNaN(amount) && amount>0) {
      const newexpense={
        id: Date.now(),
        name: name,
        amount: amount,
      }
      expenses.push(newexpense);
      saveexpenses();
      render();
      updatetotal();

      //clear input
      expenseamount.value="";
      expensename.value="";
    }

  });
  function render(){
    expenselist.innerHTML="";  
    expenses.forEach((expense)=>{
      const li = document.createElement("li");
      li.innerHTML=`
      ${expense.name} - ₹${expense.amount}
      <button data-id="${expense.id}">Delete</button>
      `;
      expenselist.appendChild(li);
    });
  }

  function calculatetotal(){
    return expenses.reduce((sum,expense)=> sum + expense.amount ,0);
  }
  function saveexpenses(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
  }
  function updatetotal(){
    totalamount = calculatetotal();
    total.textContent = totalamount.toFixed(2);
  }
  expenselist.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
      const expenseid = parseInt(e.target.getAttribute('data-id'));
      expenses = expenses.filter(expense=>expense.id!==expenseid)

      saveexpenses();
      render();
      updatetotal();
    }
  });
});