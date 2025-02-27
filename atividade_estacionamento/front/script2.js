const apiUrl = 'http://localhost:2381/carros'

async function loadCars() {
    const response = await fetch(apiUrl)

    const cars = await response.json()

    const tableBody = document.getElementById('car-list')
    tableBody.innerHTML = "";

    cars.forEach(car => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${car.placa}</td>
        <td>${car.modelo}</td>
        <td>${car.cor}</td>
        <td><button onclick="deleteCar(${car.id})">Excluir</button></td>
        <td><button onclick="editCar(${car.id})">Editar</button></td>`
        tableBody.appendChild(row)
    })
}

async function deleteCar(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadCars();
}

async function editCar(id){
    const placa = prompt('Digite uma nova placa: ')
    const modelo = prompt('Digite um novo modelo: ')
    const cor = prompt('Digite uma nova cor: ')
 
    const data = {
        placa,
        modelo,
        cor}
 
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
 
    const result = await response.json()
 
    if(result.success){
        alert(result.message)
        loadCars()
    } else {
        alert(result.message)
 
    }
 
}
loadCars()
