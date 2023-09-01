const DATABASE_STRING = "to-do"

const tasksContainer = document.getElementById("tasks-container")
const taskInput = document.getElementById("task-input")
const addTaskButton = document.getElementById("add-task-button")
const deleteAllTasksButton = document.getElementById("delete-all-tasks-button")

init()

addTaskButton.addEventListener("click", onAddButtonClicked)
deleteAllTasksButton.addEventListener("click", onDeleteAllTasksButtonClicked)

document.addEventListener("keydown", onEnterPressed)

function createTask(task, idx) {
  const {title, date, status} = task

  const taskCard = document.createElement('div')
  taskCard.classList.add('task-card')
  taskCard.innerHTML = `
    <span class="title">
    ${title}
    </span>
    <span class="date">
    ${date}
    </span>
    <div class="buttons">
      <svg onclick="onDeleteButtonClicked(${idx})" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-x-filled smooth delete-btn" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" />
      </svg>
      <svg onclick="onDoneButtonClicked(${idx})" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-check-filled smooth done-btn" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z" fill="currentColor" stroke-width="0" />
      </svg>
    </div>
  `

  if(status === "complete") {
    const doneSvg = taskCard.getElementsByClassName("done-btn")[0]
    doneSvg.remove()

    taskCard.classList.add('complete')
  }

  tasksContainer.appendChild(taskCard)
}

function init() {
  if (localStorage.getItem(DATABASE_STRING) === null) {
    localStorage.setItem(DATABASE_STRING, JSON.stringify(new Array()))
    return
  }

  sync()
}

function sync() {
  const tasks = JSON.parse(localStorage.getItem(DATABASE_STRING))
  for(let i = 0; i < tasks.length; i++) {
    createTask(tasks[i], i)
  }
}

function emptyContainer() {
  while(tasksContainer.firstChild) {
    tasksContainer.removeChild(tasksContainer.firstChild)
  }
}

function onAddButtonClicked() {
  if (taskInput.value === "") {
    console.log("No value!")
    return
  }

  const task = {
    title: taskInput.value,
    date: getCurrentDateAndTime(),
    status: "incomplete"
  }

  const tasks = JSON.parse(localStorage.getItem(DATABASE_STRING))
  tasks.push(task)

  createTask(task, tasks.length - 1)

  localStorage.setItem(DATABASE_STRING, JSON.stringify(tasks))

  taskInput.value = ""
}

function onDeleteAllTasksButtonClicked() {
  if(confirm("Are you sure you want to delete all the tasks?")) {
    localStorage.setItem(DATABASE_STRING, JSON.stringify(new Array()))
    emptyContainer()
  }
}

function onDeleteButtonClicked(idx) {
  if(confirm("Are you sure you want to delete the task?")) {
    const tasks = JSON.parse(localStorage.getItem(DATABASE_STRING))
    tasks.splice(idx, 1)
    localStorage.setItem(DATABASE_STRING, JSON.stringify(tasks))

    emptyContainer()
    sync()  
  }
}
function onDoneButtonClicked(idx) {
  const tasks = JSON.parse(localStorage.getItem(DATABASE_STRING))
  console.log(tasks[idx])
  tasks[idx].status = "complete"
  localStorage.setItem(DATABASE_STRING, JSON.stringify(tasks))

  emptyContainer()
  sync() 
}

function onEnterPressed(e) {
  if(e.key === "Enter") {
    onAddButtonClicked()
  }
}

function getCurrentDateAndTime() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const hrs = date.getHours()
  const min = date.getMinutes()

  return day + "/" + (month + 1) + "/" + year + " " + hrs + ":" + min
}