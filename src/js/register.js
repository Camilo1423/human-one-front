import {conect_uri} from './uri.js'

document.querySelector('.candidatoForm').addEventListener('submit', async (e) => {
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
    // console.log(username, nombre, apellido, role, cedula, correo, direccion, password, password2)
    if(password == password2) {
        await fetch(conect_uri+'/user/register/front', {
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
            if (data.nombre ) {
                location.href = '../../../index.html'
            }
        })
    }else {
        alert('Las contraseñas no coinciden')
    }
})