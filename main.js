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

        localStorage.setItem("tasks", JSON.stringify(tasks));

        render(tasks);
        task.value ='';
        day.value ='';
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
	let currTasks = JSON.parse(localStorage.getItem('tasks'));
	//Find index of specific object using findIndex method.    
	objIndex = currTasks.findIndex((obj => obj.id == key));
	//Log object to Console.
	// console.log("Before update: ", currTasks[objIndex])
	
	document.querySelector('.update-container').classList.add('is-active');
	document.querySelector('.close-box').addEventListener('click',()=>{
		document.querySelector('.update-container').classList.remove('is-active');
	})
	document.querySelector('.input-update-text').value = currTasks[objIndex].title;
	document.querySelector('.input-update-day').value = currTasks[objIndex].day;
	document.querySelector('.submit-update-btn').addEventListener('click', ()=>{
		currTasks[objIndex].title = document.querySelector('.input-update-text').value;
		currTasks[objIndex].day = document.querySelector('.input-update-day').value;
		// console.log('after update',currTasks[objIndex]);
		render(currTasks);
		localStorage.setItem('tasks', JSON.stringify(currTasks));
		document.querySelector('.update-container').classList.remove('is-active');
	})
	
}

render(JSON.parse(localStorage.getItem('tasks')))





