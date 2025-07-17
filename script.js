
todoList = [];



document.getElementById('todoForm').addEventListener("submit", function(event) {

    event.preventDefault();
    const input = document.getElementById('add');
    const task = input.value.trim();

    if (task != ""){
        todoList.push(task);
        addRow(task)
        showToast(`Task "${task}" succesfully added!`);
        input.value = "";
    }
    
});

function addRow(task) {

    const table = document.getElementById('taskTable');
    const row = document.createElement('tr');
    const tdTask = document.createElement('td');
    const tdActions = document.createElement('td');
    const btnDelete = document.createElement('button');
    const btnUpdate = document.createElement('button');
    btnUpdate.classList.add('update',);

    tdTask.textContent = task
    btnDelete.textContent = 'Delete'
    btnUpdate.textContent = 'Update'

    btnDelete.addEventListener("click", function(){
        row.remove();

        const index = todoList.indexOf(task);
        if (index !== -1) {
            todoList.splice(index, 1);
            console.log(todoList);
            showToast(`Task "${task}" succesfully deleted!`);

        }
    });

    btnUpdate.addEventListener("click", function(){
        if (tdTask.querySelector("input")) return;

        const index = todoList.indexOf(task);
        if (index === -1) return;

        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = task;
        inputEdit.style.width = "90%";

        tdTask.textContent = "";
        tdTask.appendChild(inputEdit);
        inputEdit.focus();

        inputEdit.addEventListener("blur", salvarAtualizacao);
        inputEdit.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
            salvarAtualizacao();
            }
        });

        function salvarAtualizacao() {
            const novoValor = inputEdit.value.trim();
            if (novoValor !== "") {
            tdTask.textContent = novoValor;
            todoList[index] = novoValor;
            task = novoValor;
            showToast(`Task updated to "${novoValor}"!`);
            } else {
            tdTask.textContent = task;
            }
        }
    });

    tdActions.appendChild(btnDelete);
    tdActions.appendChild(btnUpdate);
    row.appendChild(tdTask);
    row.appendChild(tdActions);
    table.appendChild(row);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}