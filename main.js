const DATABASE_STRING = "to-do"
init()

let taskInput = document.getElementById("task-input")
let addTaskButton = document.getElementById("add-task-button")

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

function init() {
  let tasks = localStorage.getItem(DATABASE_STRING)
  
  if(tasks === null) {
    const emptyArray = []
    localStorage.setItem(DATABASE_STRING, JSON.stringify(emptyArray))
    console.log("New Database Created!")
  }

  delete tasks
}