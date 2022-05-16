function saveToLocalStorage() {
  let arrTasks = JSON.parse(localStorage.getItem("theTaskThatWeHave"));
  if (!arrTasks) {
    arrTasks = [];
  }
  let taskObj = getValues();
  taskObj.id = arrTasks.length.toString();
  arrTasks.push(taskObj);
  localStorage.setItem("theTaskThatWeHave", JSON.stringify(arrTasks));
  printNote();
  cleanInputValues();
}

function cleanInputValues() {
  const inputs = document.querySelectorAll("input");
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
}

function deleteNote(event) {
  event.target.parentElement.remove();
  const itemId = event.target.id;
  const arrOfTasks = JSON.parse(localStorage.getItem("theTaskThatWeHave"));
  let deleteTask;
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id === itemId) {
      deleteTask = i;
    }
  }
  arrOfTasks.splice(deleteTask, 1);
  localStorage.setItem("theTaskThatWeHave", JSON.stringify(arrOfTasks));
}

function getValues() {
  const inputs = document.querySelectorAll(`input`);
  const taskObj = {
    details: inputs[0].value,
    date: inputs[1].value,
    time: inputs[2].value,
  };
  return taskObj;
}

function printNote() {
  let tasks = JSON.parse(localStorage.getItem("theTaskThatWeHave"));
  let items = ``;
  if (!tasks) {
    tasks = [];
  }
  const allNotes = document.querySelector("#allNotes");
  for (let i = 0; i < tasks.length; i++) {
    items += `<div id="note""><i id="${i}" class="bi bi-x noteClose"></i>
    <div class="inside-note">
    <p id='detailPar'>${tasks[i].details}</p>
    <p id='datePar'>${tasks[i].date}</p></div>
    <p id='timePar'> ${tasks[i].time}</p>
    </div>`;
  }
  allNotes.innerHTML = items;
}

function onFormSubmit(event) {
  event.preventDefault();
  saveToLocalStorage();
  xBtn();
}

function onWindowLoad() {
  const form = document.querySelector("form");
  form.onsubmit = onFormSubmit;
  const resetBtn = document.querySelector("#resetBtn");
  resetBtn.onclick = cleanInputValues;
  printNote();
  xBtn();
}

window.onload = onWindowLoad;

function xBtn() {
  const deleteButtons = document.querySelectorAll(".noteClose");
  for (const btn of deleteButtons) {
    btn.onclick = deleteNote;
  }
}
