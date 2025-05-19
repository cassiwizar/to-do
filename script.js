let tarefaInput = document.getElementById('tarefaInput');
let tarefas = []; 

function adicionarTarefa() {
    if (tarefaInput.value.trim() === "") return;
    
    tarefas.push({
        texto: tarefaInput.value,
        concluida: false
    });

    tarefaInput.value = ""; 
    renderizarTarefas(); 
}

function remover(event) {
    const tarefaIndex = event.target.dataset.index;
    tarefas.splice(tarefaIndex, 1); 
    renderizarTarefas(); 
}

function renderizarTarefas() {
    const lista = document.getElementById("lista");
    const filtro = document.getElementById("filtroSelect").value; 
    lista.innerHTML = ""; 
   
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtro === "concluidas") return tarefa.concluida;
        if (filtro === "nao-concluidas") return !tarefa.concluida;
        return true; 
    });

   
    tarefasFiltradas.forEach((tarefa, index) => {
        const item = document.createElement("div");
        item.className = "tarefa";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.onchange = () => {
            tarefa.concluida = checkbox.checked; 
            renderizarTarefas(); 
        };
        item.appendChild(checkbox);

        const tarefaTexto = document.createElement("span");
        tarefaTexto.textContent = tarefa.texto;
        tarefaTexto.style.textDecoration = tarefa.concluida ? "line-through" : "none";
        item.appendChild(tarefaTexto);

        const img = document.createElement("img");
        img.src = "download-removebg-preview.png";
        img.dataset.index = index; 
        img.onclick = remover; 
        item.appendChild(img);

        lista.appendChild(item);
    });
}