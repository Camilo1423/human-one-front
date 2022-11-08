import { conect_uri } from "./uri.js"
const table = document.querySelector('tbody')


fetch(conect_uri+'/requisicion/allreq')
.then(res => res.json())
.then(data => {
    let userList = ''
    let counter = 1
    data.forEach(element => {
        userList += `
            <tr>
                <th scope="row">${counter}</th>
                <td>${element.nombre}</td>
                <td>${element.fecha}</td>
                <td>${element.nVacantes}</td>
                <td>${element.fechaPublicacion}</td>
                <td>${element.fechaFinalizacion}</td>
                <td>${element.estado ? 'Publicado' : 'No Publicado'}</td>
                <td>${element.estado ? `<a href="#" class="noPublishBtn" data-id="${element._id}">Bajar Vacante</a>` : `<a href="#" class="publishBtn" data-id="${element._id}">Publicar Vacante</a>`}</td>
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

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('publishBtn')) {
        const _id = e.target.getAttribute('data-id')
        await fetch(conect_uri+'/requisicion/publish/'+_id, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 'publicado') {
                location.reload()
            }
        })
    }
})

const form = document.querySelector('.formUpdate')

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('noPublishBtn')) {
        const _id = e.target.getAttribute('data-id')
        await fetch(conect_uri+'/requisicion/nopublish/'+_id, {
            method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
            if (data.status == 'no publicado') {
                location.reload()
            }
        })
    }
})

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const _id = e.target.getAttribute('data-id')
        await fetch(conect_uri+'/requisicion/allreq/'+_id)
        .then(res => res.json())
        .then(data => {
            form.innerHTML = `
                <div class="inputContent">
                    <input type="text" value="${data.nombre}" placeholder="Nombre Requisicion" class="nombre form-control">
                    <div class="input-group inputMargin">
                        <span class="input-group-text" id="basic-addon3">Fecha</span>
                        <input type="date" value="${data.fecha}" class="form-control fecha">
                    </div>
                    <input type="text" value="${data.nVacantes}" placeholder="Numero De Vacantes" class="vacantes form-control">
                    <div class="input-group inputMargin">
                        <span class="input-group-text" id="basic-addon3">Fecha Publicación</span>
                        <input type="date" value="${data.fechaPublicacion}" class="form-control fechaPublicacion" id="basic-url">
                    </div>
                    <div class="input-group inputMargin">
                        <span class="input-group-text" id="basic-addon3">Fecha Finalización</span>
                        <input type="date" value="${data.fechaFinalizacion}" class="form-control fechaFinalizacion" id="basic-url">
                    </div>
                    <button class="btn btn-light btnUpdate" data-id=${data._id}>Actualizar Requisicion</button>
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
        const nombre = document.querySelector('.nombre').value
        const fecha = document.querySelector('.fecha').value
        const nVacantes = document.querySelector('.vacantes').value
        const fechaPublicacion = document.querySelector('.fechaPublicacion').value
        const fechaFinalizacion = document.querySelector('.fechaFinalizacion').value
        await fetch(conect_uri+'/requisicion/update/'+_id, {
            method: 'PUT',
            body: JSON.stringify({nombre, fecha, nVacantes, fechaFinalizacion, fechaPublicacion}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            if(data.status == 'actualizado') {
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
            await fetch(conect_uri+'/requisicion/delete/'+_id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                if(data.status == 'eliminado') {
                    location.reload()
                }
            })
        }
    }
})