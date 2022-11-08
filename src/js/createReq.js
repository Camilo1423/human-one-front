import { conect_uri } from "./uri.js"
const table = document.querySelector('tbody')


fetch(conect_uri+'/perfil/allperfil')
.then(res => res.json())
.then(data => {
    let userList = ''
    let counter = 1
    data.forEach(element => {
        userList += `
            <tr>
                <th scope="row">${counter}</th>
                <td>${element.nombre}</td>
                <td>${element.competencias}</td>
                <td>${element.salario}</td>
                <td>${element.experiencia}</td>
                <td>${element.areaTrabajo}</td>
                <td>${element.locacion}</td>
                <td>${element.tipoContrato}</td>
            </tr>
        `
        counter++
    })
    table.innerHTML = userList
})

document.querySelector('.formCreate').addEventListener('submit', async (e) => {
    e.preventDefault()
    const nombre = document.querySelector('.nombre').value
    const fecha = document.querySelector('.fecha').value
    const nVacantes = document.querySelector('.vacantes').value
    const fechaPublicacion = document.querySelector('.fechaPublicacion').value
    const fechaFinalizacion = document.querySelector('.fechaFinalizacion').value
    await fetch(conect_uri+'/requisicion/register' , {
        method: 'POST',
        body: JSON.stringify({ nombre, fecha, nVacantes, fechaPublicacion, fechaFinalizacion }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.status == 'done') {
            location.reload()
        }
    })
})