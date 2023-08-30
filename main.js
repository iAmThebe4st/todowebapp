const DATABASE_STRING = "to-do"
init()

const taskInput = document.getElementById("task-input")
const addTaskButton = document.getElementById("add-task-button")

addTaskButton.addEventListener("click", onAddButtonClicked)

function onAddButtonClicked() {
  if(taskInput.value === "") {
    console.log("No value!")
    return
  }

  const task = {
    title: taskInput.value,
    status: "incomplete"
  }

  const tasks = JSON.parse(localStorage.getItem(DATABASE_STRING))
  tasks.push(task)

  localStorage.setItem(DATABASE_STRING, JSON.stringify(tasks))

  console.log('New task added successfully!')
}

createTask()
function createTask() {
  const tasksContainer = document.getElementById("tasks-container")
  const p = document.createElement('p')
}

function init() {
  let tasks = localStorage.getItem(DATABASE_STRING)
  
  if(tasks === null) {
    const emptyArray = []
    localStorage.setItem(DATABASE_STRING, JSON.stringify(emptyArray))
    console.log("New database created!")
  }
  
  delete tasks
}