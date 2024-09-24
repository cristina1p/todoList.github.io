// todo 'click' ENTER
// Target elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const showAllBtn = document.getElementById("filter-all");
const showDoneBtn = document.getElementById("filter-done");
const showUndoneBtn = document.getElementById("filter-undone");

const tasks = document.getElementsByTagName("li"); // This 'tasks' will be used in filter function, for loop, to iterate through 'li'

// Add task
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Click function
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); // 'e.target'-specific element inside the container, clicked
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); // 'parent.Element' = li
      saveData();
    }
  },
  false
);

// Function Save Data
function saveData() {
  // todo__: save {task: string, checked: boolean} in local storage, instead of html
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function Display Task
function displayTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

displayTask();

// Show filter all tasks - "ALL"
showAllBtn.addEventListener("click", function () {
  getAllTasks(); // call function for all tasks
});
// Create function all task
function getAllTasks() {
  const task = listContainer.getElementsByTagName("li");
  for (let task of tasks) {
    task.style.display = "block"; // Show all tasks
  }
}

// Show filter - 'UNDONE' button
showUndoneBtn.addEventListener("click", function () {
  filterUndoneTasks(); // call function to filter undone tasks
});
// Create filter undone tasks
function filterUndoneTasks() {
  const task = listContainer.getElementsByTagName("li"); // get al task list items
  for (let task of tasks) {
    // iterate through 'li'
    if (!task.classList.contains("checked")) {
      // task is not done
      task.style.display = "block";
    } else {
      task.style.display = "none"; // hide completed task
    }
  }
}

// Show filter - "DONE" button
showDoneBtn.addEventListener("click", function () {
  filterDoneTasks();
});
function filterDoneTasks() {
  const task = listContainer.getElementsByTagName("li");
  for (let task of tasks) {
    if (!task.classList.contains("checked")) {
      // task is not done
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  }
}
