/*
Переход к след. задаче | при подключении вызвать, nextTask()
*/

const tasksHTML = document.querySelectorAll("#group_task li");
let currentTask = 0;
async function nextTask() {
    const currentTaskHTML = tasksHTML[currentTask]
    currentTaskHTML.classList.add("solved");  // текущая решена
    currentTaskHTML.textContent = "✓ " + currentTaskHTML.textContent;
    currentTask += 1;
    if (currentTask < tasksHTML.length) {  // не все задания решены
        tasksHTML[currentTask].classList.remove("disabled");  // след. разблокирована
    } else {
        const nextLessonBtn = document.getElementById("finishBtn");
        nextLessonBtn.textContent = "Продолжить";
        nextLessonBtn.classList.remove("disabled");
    }
}