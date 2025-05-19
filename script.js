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
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        const tarefaInput = document.getElementById("tarefaInput");
        tarefaInput.focus(); 
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        const filtroSelect = document.getElementById("filtroSelect");
        filtroSelect.focus(); 
    }
}
);
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const tarefaInput = document.getElementById("tarefaInput");
        if (document.activeElement === tarefaInput) {
            adicionarTarefa();
    }
}
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        if (tarefas.length > 0) {
            tarefas.pop(); 
            renderizarTarefas(); 
        }
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
        if (tarefas.length > 0) {
            const ultimaTarefa = tarefas[tarefas.length - 1]; 
            ultimaTarefa.concluida = true; 
            renderizarTarefas();
        }
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Control") {
        if (tarefas.length > 0) {
            const ultimaTarefa = tarefas[tarefas.length - 1]; 
            ultimaTarefa.concluida = false; 
            renderizarTarefas();
        }
    }
});