// console.log(document.getElementById('formTask'))
document.getElementById('formTask').addEventListener('submit',guardar);

function guardar(e){
    // mostrar valores de los inputs
    let tittle=document.getElementById('title').value;
    let description=document.getElementById('description').value;

    // json
    const task = {
        tittle,
        description
    };

    // almacenamiento de datos

    if (localStorage.getItem('tasks')===null){
        let tasks =[];
        // push guarda un dato en el arreglo
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }else{
       let tasks = JSON.parse(localStorage.getItem('tasks'));
       tasks.push(task);
       localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    mostrar();
    // limpiamos el formulario para agregar un nuevo dato
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function mostrar(){
   let tasks = JSON.parse(localStorage.getItem('tasks'));
   let tasksView = document.getElementById('tasks');

   tasksView.innerHTML ='';

   for (let i = 0; i < tasks.length; i++) {
    let tittle = tasks[i].tittle;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
        <p>${tittle} - ${description}</p>
        <a class="btn btn-danger" onclick="eliminar('${tittle}')">
        Borrar
        </a>
    </div>`
   }
}
function eliminar(tittle){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // recorro los datos almacenados
    for (let i = 0; i < tasks.length; i++) {
       if (tasks[i].tittle == tittle){
        //mensaje de alerta si deseamos eliminar el registro
            var opcion = confirm("Desea eliminar el registro");
            if (opcion == true) {
                //splice elimina dato del arreglo
                tasks.splice(i,1);
            } 
       } 
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    mostrar();
}
mostrar();