var form=document.querySelector("form");
var inputText=document.getElementById("input-text");
var btn=document.getElementById("save-btn");
var lists=document.querySelector(".todo-lists");
var msg=document.getElementById("notification-msg");


//get from local storage

const getLocalStorage=()=>{
    return localStorage.getItem("mytodo") ? 
    JSON.parse(localStorage.getItem("mytodo")) : [];
}

//set local storage

const setLocalStorage=(todoId,todoValue)=>{
   
    let todoLists=getLocalStorage();

    todoLists.push({id:todoId,value:todoValue});
    localStorage.setItem("mytodo",JSON.stringify(todoLists));
    
}

//creating list 

const createList=(todoId,todoValue)=>{
  let newList=document.createElement("li");
  newList.id=todoId;
  newList.classList.add("li-style");
  newList.innerHTML=`
  <span class="text">${todoValue} </span>
  <span class="btn"><button id="deleteButton"><i class="fa-solid fa-trash"></button></i></span>
  `
  lists.appendChild(newList);

  let deleteBtn=newList.querySelector("#deleteButton");

  deleteBtn.addEventListener("click",deleteList);
  
}

//delete list

const deleteList=(event)=>{
    let selectedList=event.target.parentElement.parentElement.parentElement;
    lists.removeChild(selectedList);

    let todos=getLocalStorage();

  todos= todos.filter((todo)=>{
        return todo.id!=selectedList.id;
    });

    localStorage.setItem("mytodo",JSON.stringify(todos));
    showMessage("ToDo is deleted successfully !","red");

}

//adding lists 

const addLists=(event)=>{
    event.preventDefault();
    let todoId=Date.now().toString();
    let todoValue=inputText.value;
    setLocalStorage(todoId,todoValue);
    createList(todoId,todoValue);
    showMessage("ToDo is created successfully !","green");
     inputText.value="";
}

//show message

const showMessage=(text,color)=>{

    msg.innerHTML=`${text}`;
    msg.classList.add(`bg-${color}`);

    setTimeout(()=>{
        msg.innerHTML="";
        msg.classList.remove(`bg-${color}`);
    },1000);

    
}



//load todos 

const loadTodos=()=>{
    let todos=getLocalStorage();
console.log(todos)
    todos.map((v)=>{ 
        createList(v.id,v.value);
    })
}

form.addEventListener("submit",addLists);
loadTodos();