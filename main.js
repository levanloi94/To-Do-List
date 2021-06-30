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

        localStorage.setItem("tasks", JSON.stringify(tasks));

        render(tasks);
        task.value ='';
        day.value ='';

        let deleteBtn = document.querySelectorAll('.delete-btn')
//         console.log('delete btn',deleteBtn);
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

const loadBtn = () =>{
  let deleteBtn = document.querySelectorAll('.delete-btn')
  for(let i = 0 ; i< deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click',()=>{
      let key = parseInt(deleteBtn[i].getAttribute('key'));
      deleteTask(key);
    })
  }
	let updateBtn  =  document.querySelectorAll('.update-btn')
	for(let i = 0; i < updateBtn.length; i++){
		updateBtn[i].addEventListener(('click'), ()=>{
			let key = parseInt(updateBtn[i].getAttribute('key'));
			updateTask(key);
			// console.log(key);
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
                            <button class="delete-btn" key = "${item.id}">DONE</button>
                            <button class="update-btn" key = "${item.id}">UPDATE</button>
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
    // console.log(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    render(newTasks);
}
addBtn.addEventListener("click", (e)=>{
    addTask();
})

// UPDATE func
const updateTask = (key)=>{
    let updateContainer = document.querySelector('.update-container');
    let updateTitle = document.querySelector('.input-update-text');
    let updateDay = document.querySelector('.input-update-day');
	let currTasks = JSON.parse(localStorage.getItem('tasks'));
    let closeBtn = document.querySelector('.close-box');
    let submitUpdate = document.querySelector('.submit-update-btn');
    
	//Find index of specific object using findIndex method.    
	objIndex = currTasks.findIndex((obj => obj.id == key));
	//Log object to Console.
	console.log("Before update: ", currTasks[objIndex])
	let newTask = currTasks[objIndex];
	updateContainer.classList.add('is-active');
	closeBtn.addEventListener('click',()=>{
		updateContainer.classList.remove('is-active');
	})
	updateTitle.value = currTasks[objIndex].title;
	updateDay.value = currTasks[objIndex].day;
	submitUpdate.addEventListener('click', ()=>{
		newTask.title = updateTitle.value;
		newTask.day = updateDay.value;
		// console.log('after update',currTasks[objIndex]);
		render(currTasks);
		localStorage.setItem('tasks', JSON.stringify(currTasks));
		updateContainer.classList.remove('is-active');
	})
	
}

render(JSON.parse(localStorage.getItem('tasks')))


