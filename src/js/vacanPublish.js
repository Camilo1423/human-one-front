import { conect_uri } from "./uri.js"
const content = document.querySelector('.vacantes')

fetch(conect_uri+'/requisicion//allreqpublish')
.then(res => res.json())
.then(data => {
    let datos = ''
    data.forEach(element => {
        datos += `
        <div class="card">
            <div class="card-header redColor">
                ${element.nombre}
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <h2>${element.nombre}</h2>
                    <h5>Plazas disponibles: ${element.nVacantes}</h5>
                    <div class="fechas">
                        <p><strong>Publicado:</strong> ${element.fechaPublicacion}</p>
                        <p><strong>Finaliza:</strong> ${element.fechaFinalizacion}</p>
                    </div>
                    <a href="#" class="btn redColor btnCandidato">Postularme</a>
                </blockquote>
            </div>
        </div>
        `
    })
    content.innerHTML = datos
})

content.addEventListener('click', async (e) => {
    e.preventDefault()
    if (e.target.classList.contains('btnCandidato')) {
        sessionStorage.sessionid ? location.href = '../candidato/candidato.html' : location.href = '../../../index.html'
    }
})