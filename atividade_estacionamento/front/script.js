const apiUrl = 'http://localhost:2381/carros'


document.getElementById("car-form").addEventListener("submit", async function (event) {
    event.preventDefault()

    const placa = document.getElementById("placa").value;
    const modelo = document.getElementById("modelo").value;
    const cor = document.getElementById("cor").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({ placa, modelo, cor })
    })

    if (response.ok) {
        document.getElementById('car-form').reset()
        
    } else {
        alert('Erro ao adicionar carro!')
    }
})

