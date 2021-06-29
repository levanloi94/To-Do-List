const listSpace = document.querySelector('.task-list');
const task = document.querySelector('.input-text');
const day = document.querySelector('.input-day');

const addBtn = document.querySelector('.submit-btn');
//random id func
const randomId = ()=>{
    return Math.floor(Math.random()*10000)
}
//add new task func
const addTask = () =>{  
    let tasks  =  localStorage.getItem('tasks')
    let id = randomId();
    tasks =JSON.parse(tasks);
    if(task.value!=='' && day.value !==''){
        if(tasks!==null){
            tasks = [...tasks,{id:id, title:task.value, day:day.value}];
        }else{
            tasks = [...[],{id:id, title:task.value, day:day.value}];
        }
        let currTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(currTasks);
        console.log("new tasks list",tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if(currTasks == null  || currTasks.length<=0 ){
            listSpace.innerHTML = `
            <li class="task-item" >
                <div>
                    <h3>${task.value}</h3>
                    <br/>
                    <h4>${day.value}</h4>
                </div>
                <button class="delete-btn" key="${id}">DONE</button>
            </li>
        `
        }else{
            listSpace.innerHTML += `
            <li class="task-item" >
                <div>
                    <h3>${task.value}</h3>
                    <br/>
                    <h4>${day.value}</h4>
                </div>
                <button class="delete-btn" key="${id}">DONE</button>
            </li>
        `
        }

        
        task.value ='';
        day.value ='';

        let deleteBtn = document.querySelectorAll('.delete-btn')
        console.log('delete btn',deleteBtn);
        for(let i = 0 ; i< deleteBtn.length; i++){
            deleteBtn[i].addEventListener('click',()=>{
                let key = parseFloat(deleteBtn[i].getAttribute('key'));
                deleteTask(key);
                deleteBtn[i].parentElement.remove();
            })
        }

    }else{
        alert('plz enter task')
    }
}
const render = (itemTask) =>{

    if(itemTask==null || itemTask.length<=0){
        listSpace.innerHTML = `
           You don't have any task
        `
    }else{
        itemTask.map((item) =>{
        listSpace.innerHTML += `
            <li class="task-item" >
                <div>
                <h3>${item.title}</h3>
                <br/>
                <h4>${item.day}</h4>
                </div>
                <button class="delete-btn" key = "${item.id}">DONE</button>
            </li>
        `
    })
    }
  
}

const deleteTask = (index) =>{
    console.log('id delete', index);
    let currTasks = JSON.parse(localStorage.getItem('tasks'));
    let newTasks;
    console.log('tasks list before delete',currTasks);



    if(currTasks.length>1){
        newTasks = currTasks.filter(tasks =>{
        return tasks.id !== index;
        })
    }else{
        newTasks = [];
        listSpace.innerHTML = `
           You don't have any task
        `
    }
    console.log('tasks after delete', newTasks);
    localStorage.setItem('tasks',JSON.stringify(newTasks));

    

}
addBtn.addEventListener("click", (e)=>{
    addTask();
})
render(JSON.parse(localStorage.getItem('tasks')))


let deleteBtn = document.querySelectorAll('.delete-btn')
console.log('delete btn',deleteBtn);
for(let i = 0 ; i< deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click',()=>{
        let key = parseFloat(deleteBtn[i].getAttribute('key'));
        deleteTask(key);
        deleteBtn[i].parentElement.remove();
    })
}


