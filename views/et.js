const form=document.getElementById('form')

form.addEventListener('submit',addExpense)

let editingId

async function addExpense(e){
    try{
        e.preventDefault()
        const ename=document.getElementById('ename').value
        const etype=document.getElementById('ecategory').value
        const eamount=document.getElementById('eamount').value
        let editingId=localStorage.getItem('editingId')
        console.log(editingId)
        
        if(editingId){
            var my_obj={
                id:editingId,
                ename,
                etype,
                eamount
            }
            editingId=null
        }
        else{
            var my_obj={
                id:null,
                ename,
                etype,
                eamount
            }
        }
    
        const res=await axios.post('http://localhost:3010/postExpense', my_obj)
        if(res.data.newExpense){
            showOnScreen(res.data.newExpense)
        }
        else{
            showOnScreen(res.data.expenseUpdated)
        }
    }
    catch(err){
        console.log(err)
    }
}

function showOnScreen(data){
    try{
        const parentNode=document.getElementById('item')
        let childHTML=`<li id="${data.id}"> ${data.expensename} - ${data.typeofexpense} - ${data.expenseprice}
                       <button onclick="deleteExpense('${data.id}')">DELETE</button>
                       <button class="btn2" onclick="editExpense('${data.id}','${data.expensename}','${data.typeofexpense}','${data.expenseprice}')">EDIT</button>
                       </li>`
        parentNode.innerHTML=parentNode.innerHTML+childHTML
    }
    catch(err){
        console.log(err)
    }
}

window.addEventListener("DOMContentLoaded",async ()=>{
    try{
        const res=await axios.get('http://localhost:3010/getExpense')
        for(let i=0;i<res.data.allExpense.length;i++){
            showOnScreen(res.data.allExpense[i])
        }
    }
    catch(err){
        console.log(err)
    }
})

async function deleteExpense(id){
    try{
        await axios.delete(`http://localhost:3010/deleteExpense/${id}`)
        removeFromScreen(id)
    }
    catch(err){
        console.log(err)
    }
}

function removeFromScreen(id){
    try{
       const parentNode=document.getElementById('item')
       const childNodeToDelete=document.getElementById(id)
       console.log(childNodeToDelete)
       if(childNodeToDelete)
       parentNode.removeChild(childNodeToDelete)
    }
    catch(err){
    console.log(err)
    }
}


function editExpense(id,name,cat,price){
    localStorage.setItem('editingId',id)

    if (event.target.classList.contains('btn2')) {
        console.log(id,name,cat,price)
        document.getElementById('ename').value=name
        document.getElementById('ecategory').value=cat
        document.getElementById('eamount').value=price
    }
}

