import { conect_uri } from "./uri.js";
const table = document.querySelector('tbody')

const roleUserFront = (role) => {
    let state;
    if (role === 'admin') {
        state = `Administrador`
    } else if (role == 'cordinador') {
        state = `Cordinador`
    } else if (role == 'area') {
        state = `Jefe de Area`
    } else {
        state = `Candidato`
    }
    return state
}

fetch(conect_uri+'/user/allusers').then(res => res.json())
.then(data => {
    let userList = ''
    let counter = 1
    data.forEach(element => {
        if (element.username !== 'soyJuly' && element.username !== sessionStorage.username){
            userList += `
                <tr>
                    <th scope="row">${counter}</th>
                    <td>${element.username}</td>
                    <td>${element.nombre} ${element.apellido}</td>
                    <td>${roleUserFront(element.role)}</td>
                    <td>${element.cedula}</td>
                    <td>${element.correo}</td>
                    <td>${element.direccion}</td>
                    <td class="action">
                        <a href="#" class="edit" data-id=${element._id} data-bs-toggle="modal" data-bs-target="#exampleModal"><i data-id=${element._id} class='bx bx-pencil edit'></i></a>
                        <a href="#" class="delete" data-id=${element._id}><i data-id=${element._id} class='bx bx-trash-alt delete'></i></a>
                    </td>
                </tr>
            `
            counter++
        }
    })
    table.innerHTML = userList
})


document.querySelector('.formCreate').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.querySelector('.username').value
    const nombre = document.querySelector('.nombre').value
    const apellido = document.querySelector('.apellido').value
    const role = document.querySelector('#role').value
    const cedula = document.querySelector('.cedula').value
    const correo = document.querySelector('.correo').value
    const direccion = document.querySelector('.direccion').value
    const password = document.querySelector('.password').value
    const password2 = document.querySelector('.password2').value
    if(password == password2) {
        await fetch(conect_uri+'/user/register', {
            method: 'POST',
            body: JSON.stringify({
                usernameAdmin: sessionStorage.username,
                username,
                nombre,
                apellido,
                role,
                cedula,
                correo,
                direccion,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.username) {
                location.reload()
            }
        })
    }else {
        alert('Las contraseñas no coinciden')
    }
})

const roleUser = (role) => {
    let state;
    if (role === 'admin') {
        state = `
            <option value="admin" selected>Aministrador</option>
            <option value="cordinador">Cordinador</option>
            <option value="area">Jefe de area</option>
            <option value="candidato">Candidato</option>
        `
    } else if (role == 'cordinador') {
        state = `
            <option value="admin">Aministrador</option>
            <option value="cordinador" selected>Cordinador</option>
            <option value="area">Jefe de area</option>
            <option value="candidato">Candidato</option>
        `
    } else if (role == 'area') {
        state = `
            <option value="admin">Aministrador</option>
            <option value="cordinador">Cordinador</option>
            <option value="area" selected>Jefe de area</option>
            <option value="candidato">Candidato</option>
        `
    } else {
        state = `
            <option value="admin">Aministrador</option>
            <option value="cordinador">Cordinador</option>
            <option value="area">Jefe de area</option>
            <option value="candidato" selected>Candidato</option>
        `
    }
    return state
}

const form = document.querySelector('.formUpdate')

table.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit')) {
        const _id = e.target.getAttribute('data-id')
        await fetch(conect_uri+'/user/allusers/'+_id)
        .then(res => res.json())
        .then(data => {
            form.innerHTML = `
                <div class="inputContent">
                    <input type="text" placeholder="Usuario" value=${data.username} class="username form-control">
                    <input type="text" placeholder="Nombre" value=${data.nombre} class="nombre form-control">
                    <input type="text" placeholder="Apellido" value=${data.apellido} class="apellido form-control">
                    <select name="role" id="role" class="form-select">
                        ${roleUser(data.role)}
                    </select>
                    <input type="text" placeholder="Cedula" value=${data.cedula} class="cedula form-control">
                    <input type="text" placeholder="Correo" value=${data.correo} class="correo form-control">
                    <input type="text" placeholder="Dirección" value=${data.direccion} class="direccion  form-control">
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
        const username = document.querySelector('.formUpdate .username').value
        const nombre = document.querySelector('.formUpdate .nombre').value
        const apellido = document.querySelector('.formUpdate .apellido').value
        const role = document.querySelector('.formUpdate #role').value
        const cedula = document.querySelector('.formUpdate .cedula').value
        const correo = document.querySelector('.formUpdate .correo').value
        const direccion = document.querySelector('.formUpdate .direccion').value

        await fetch(conect_uri+'/user/update/'+_id, {
            method: 'PUT',
            body: JSON.stringify({
                usernameAdmin: sessionStorage.username,
                username,
                nombre,
                apellido,
                role,
                cedula,
                correo,
                direccion
            }),
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
            await fetch(conect_uri+'/user/delete/'+_id, {
                method: 'DELETE',
                body: JSON.stringify({
                    usernameAdmin: sessionStorage.username
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => {
                if(data.res == 'ok!') {
                    location.reload()
                }
            })
        }
    }
})