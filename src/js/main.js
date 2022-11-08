const logout = document.querySelector('.logout')
logout.addEventListener('click', () => {
    sessionStorage.clear()
    window.location.href = '../../../index.html'
})