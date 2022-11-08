if(sessionStorage.username) {
    if(sessionStorage.role == 'admin') {
        location.href = './src/routes/admin/home.html'
    } else if(sessionStorage.role == 'area') {
        location.href = './src/routes/admin/home.h'
    } else if (sessionStorage.role == 'cordinador') {
        location.href = './src/routes/admin/home.ht'
    } else {
        location.href = './src/routes/candidato/candidato.html'
    }
}

import { conect_uri } from "./uri.js";
const error = document.querySelector('.responsError')

document.querySelector('.loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    await fetch(conect_uri+'/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        const Data = ["_id", "username", "nombre", "apellido", "role", "cedula", "correo", "direccion"];
        const Data2 = [ data._id, data.username, data.nombre, data.apellido, data.role, data.cedula, data.correo, data.direccion]
        if (data.status == 'done'){
            for (let i = 0; i < Object.keys(data).length -1; i++) {
                sessionStorage.setItem(`${Data[i]}`, `${Data2[i]}`);
            }
            sessionStorage.setItem("sessionid", true);
            if (data.role == 'admin') {
                location.href = './src/routes/admin/home.html'
            } else if (data.role == 'candidato') {
                location.href = './src/routes/candidato/candidato.html'
            }
        }else if (data.status =='fail') {
            error.innerHTML = `<p>Contraseña incorrecta</p>`
        } else {
            error.innerHTML = `<p>El usuario no esta registrado</p>`
        }
    })
});