const listSpace = document.querySelector('.task-list');
const task = document.querySelector('.input-text');
const day = document.querySelector('.input-day');

const addBtn = document.querySelector('.submit-btn');
//Random id func
const randomId = ()=>{
    return Math.floor(Math.random()*10000)
}
//Add new task func
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
//         console.log(currTasks);
//         console.log("new tasks list",tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadBtn();
        render(tasks);
        task.value ='';
        day.value ='';
    }else{
        alert('plz enter task')
    }
}

const loadBtn = () =>{
    let deleteBtn = document.querySelectorAll('.delete-btn')
    for(let item of deleteBtn){
        item.addEventListener('click',()=>{
            let key = parseInt(item.getAttribute('data-key'));
            deleteTask(key);
            item.parentElement.parentElement.remove();
        })
    }

	let updateBtn  =  document.querySelectorAll('.update-btn')
    for(let item of updateBtn){
       item.addEventListener('click', ()=>{
           let key = parseInt(item.getAttribute('data-key'));
           updateTask(key);
       })
    }
}

//Render all task func
const render = (itemTask) =>{
    if( itemTask == null || itemTask.length<=0){
        listSpace.innerHTML = `You don't have any task`
    }else{
        let listItem = itemTask.map((item)=>{
            return `
                   <li class="task-item" >
                        <div class="left-box">
                            <h3>${item.title}</h3>
                            <br/>
                            <h4>${item.day}</h4>
                        </div>
                        <div class="right-box">
                            <button class="delete-btn" data-key = "${item.id}">DONE</button>
                            <button class="update-btn" data-key = "${item.id}">UPDATE</button>
                        </div>
                    </li>
                `
        });
        listSpace.innerHTML =  listItem.join('');
    }
   	loadBtn();
}

//Delete Func
const deleteTask = (index) =>{
    let currTasks = JSON.parse(localStorage.getItem('tasks'));
    let newTasks = currTasks.filter(tasks => {
        return tasks.id !==index;
    })
    if(newTasks.length == 0){
        listSpace.innerHTML = `You don't have any task`
    }
    // console.log(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    // render(newTasks);
}
addBtn.addEventListener("click", (e)=>{
    addTask();
})

// UPDATE func
const updateTask = (key)=>{
    const updateContainer = document.querySelector('.update-container');
    const updateTitle = document.querySelector('.input-update-text');
    const updateDay = document.querySelector('.input-update-day');
	const currTasks = JSON.parse(localStorage.getItem('tasks'));
    const closeBtn = document.querySelector('.close-box');
    const submitUpdate = document.querySelector('.submit-update-btn');

	//Find index of specific object using findIndex method.    
	objIndex = currTasks.findIndex((obj => obj.id == key));
	//Log object to Console.
	// console.log("Before update: ", currTasks[objIndex])
	let newTask = currTasks[objIndex];
	updateContainer.classList.add('is-active');
	closeBtn.addEventListener('click',()=>{
		updateContainer.classList.remove('is-active');
	})
	updateTitle.value = currTasks[objIndex].title;
	updateDay.value = currTasks[objIndex].day;
	submitUpdate.addEventListener('click', () => {
		if(updateTitle.value !== '' && updateDay.value !== ''){
            newTask.title = updateTitle.value;
            newTask.day = updateDay.value;
            // console.log('after update',currTasks[objIndex]);
            render(currTasks);
            localStorage.setItem('tasks', JSON.stringify(currTasks));
            updateContainer.classList.remove('is-active');
        }else{
            alert('Plz add update task or update day')
        }
	})
}
// render task list after open page
render(JSON.parse(localStorage.getItem('tasks')))


