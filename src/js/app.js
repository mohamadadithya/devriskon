const searchForm = document.querySelector('.search-form')
const userCardContainer = document.querySelector('.user-card')
const loader = document.querySelector('.loader')

const getUser = async () => {
    let keyword = document.querySelector('.keyword')
    if(keyword.value.length <= 0) {
        userCardContainer.innerHTML = loader.innerHTML
    } else {
        loader.innerHTML = '<i class="fas fa-spin fa-spinner"></i>'
        const response = await fetch(`https://api.github.com/users/${keyword.value}`)
        const result = await response.json()
        const data = await result
        showUser(data)
        loader.innerHTML = 'Please enter your GitHub username.'
    }
}

const showUser = (data) => {
    if (data.message === 'Not Found') {
        loader.innerHTML = 'User not found.'
        userCardContainer.innerHTML = loader.innerHTML
    } else {
        let userCardHTML = `<div class="head d-flex center">
        <img src="${data.avatar_url}" alt="${data.name}" class="photo">
        <div class="d-flex between w-100 sub">
            <div>
                <h1 class="name fw-bold">${(data.name) ? data.name : '-'}</h1>
                <a href="${data.html_url}" class="username" target="_blank">@${data.login}</a>
            </div>
            <p class="joined">Joined ${new Date(data.created_at).toLocaleDateString('en-US')}</p>
        </div>
    </div>
    <div class="details">
        <p class="bio">${(data.bio) ? data.bio : '-'}</p>
        <ul class="card d-flex between center">
            <li>
                <h6 class="mb-5">Repos</h6>
                <span class="fw-bold">${data.public_repos}</span>
            </li>
            <li>
                <h6 class="mb-5">Followers</h6>
                <span class="fw-bold">${data.followers}</span>
            </li>
            <li>
                <h6 class="mb-5">Following</h6>
                <span class="fw-bold">${data.following}</span>
            </li>
        </ul>
        <div class="links d-flex between">
            <ul>
                <li>
                    <i class="fas fa-fw fa-map-marked-alt"></i>
                    <span>${(data.location) ? data.location : '-'}</span>
                </li>
                <li>
                    <i class="fas fa-fw fa-link"></i>
                    <span>${(data.blog) ? data.blog : '-'}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <i class="fab fa-fw fa-twitter"></i>
                    <span>${(data.twitter_username) ? data.twitter_username : '-'}</span>
                </li>
                <li>
                    <i class="fas fa-fw fa-building"></i>
                    <span>${(data.company) ? data.company : '-'}</span>
                </li>
            </ul>
        </div>
    </div>`

    userCardContainer.innerHTML = userCardHTML
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getUser()
})