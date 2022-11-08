import { conect_uri } from "./uri.js"
const optional = document.querySelector('.contentOption')
optional.innerHTML = `<option selected disabled>No hay vacantes</option>`


fetch(conect_uri+'/requisicion//allreqpublish')
.then(res => res.json())
.then(data => {
    let datos = ''
    data.forEach(element => {
        datos += `
            <option value="${element.nombre}">${element.nombre}</option>
        `
    })
    optional.innerHTML = `
        <option selected disabled>Vacante a Aplicar</option>
        ${datos}
    `
})
