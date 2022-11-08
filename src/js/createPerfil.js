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
                <td class="action">
                        <a href="#" class="edit" data-id=${element._id} data-bs-toggle="modal" data-bs-target="#exampleModal"><i data-id=${element._id} class='bx bx-pencil edit'></i></a>
                        <a href="#" class="delete" data-id=${element._id}><i data-id=${element._id} class='bx bx-trash-alt delete'></i></a>
                </td>
            </tr>
        `
        counter++
    })
    table.innerHTML = userList
})

const form = document.querySelector('.formUpdate')

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const _id = e.target.getAttribute('data-id')
        await fetch(conect_uri+'/perfil/allperfil/'+_id)
        .then(res => res.json())
        .then(data => {
            form.innerHTML = `
                <div class="inputContent">
                    <input type="text" name="nombre" value="${data.nombre}" placeholder="Nombre Requisicion" class="nameP form-control">
                    <input type="text" name="competencias" value="${data.competencias}" placeholder="Competencias" class="compt form-control">
                    <input type="text" name="salario" value="${data.salario}" placeholder="Salario" class="salario1 form-control">
                    <input type="text" name="experiencia" value="${data.experiencia}" placeholder="Experiencia" class="experiencia1 form-control">
                    <input type="text" name="areaTrabajo" value="${data.areaTrabajo}" placeholder="Area De Trabajo" class="areaTrabajo1 form-control">
                    <input type="text" name="locacion" value="${data.locacion}" placeholder="Ubicación" class="locacion1 form-control">
                    <input type="text" name="tipoContrato" value="${data.tipoContrato}" placeholder="Tipo de contrato" class="tipoContrato1 form-control">
                    <button type="button" class="btn btn-light btnUpdate" data-id=${data._id}>Actualizar Información</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            `
        })
    }
})

form.addEventListener('click', async (e) => {
    e.preventDefault()
    if (e.target.classList.contains('btnUpdate')) {
        const _id = e.target.getAttribute('data-id')
        const nombre = document.querySelector('.nameP').value
        const competencias = document.querySelector('.compt').value
        const salario = document.querySelector('.salario1').value
        const experiencia = document.querySelector('.experiencia1').value
        const areaTrabajo = document.querySelector('.areaTrabajo1').value
        const locacion = document.querySelector('.locacion1').value
        const tipoContrato = document.querySelector('.tipoContrato1').value
        await fetch(conect_uri+'/perfil/update/'+_id, {
            method: 'PUT',
            body: JSON.stringify({nombre, competencias, salario, experiencia, areaTrabajo, locacion, tipoContrato}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.status == 'done') {
                location.reload()
            }
        })
    }
})

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete')) {
        const confirmacion = confirm('Seguro que quieres eliminar este usuario?')
        const _id = e.target.getAttribute('data-id')
        if (confirmacion) {
            await fetch(conect_uri+'/perfil/delete/'+_id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                if(data.status == 'done') {
                    location.reload()
                }
            })
        }
    }
})

document.querySelector('.formCreate').addEventListener('submit', async (e) => {
    e.preventDefault()
    const nombre = document.querySelector('.nombre').value
    const competencias = document.querySelector('.Competencias').value
    const salario = document.querySelector('.salario').value
    const experiencia = document.querySelector('.experiencia').value
    const areaTrabajo = document.querySelector('.areaTrabajo').value
    const locacion = document.querySelector('.locacion').value
    const tipoContrato = document.querySelector('.tipoContrato').value
    await fetch(conect_uri+'/perfil/register', {
        method: 'POST',
        body: JSON.stringify({nombre, competencias, salario, experiencia, areaTrabajo,locacion, tipoContrato}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        if(data.status == 'done') {
            location.reload()
        }
    })
})