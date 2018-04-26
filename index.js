const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let loadButtonEl;
let commentsDivEl;
let albumsDivEl;
let photosDivEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const postIdAttr = document.createAttribute('data-post-id');
        postIdAttr.value = post.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = post.title;
        buttonEl.setAttributeNode(postIdAttr);
        buttonEl.addEventListener('click', onLoadComments);
        document.getElementById('albums').style.display = 'none';
        document.getElementById('comments').style.display = 'none';
        document.getElementById('photos').style.display = 'none';

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function createCommentsList(comments) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.email;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
        document.getElementById('posts').style.display = 'none';
    }

    return ulEl;
}

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const albumIdAttr = document.createAttribute('data-album-id');
        albumIdAttr.value = album.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = album.title;
        buttonEl.setAttributeNode(albumIdAttr);
        buttonEl.addEventListener('click', onLoadPhotos);
        document.getElementById('posts').style.display = 'none';
        document.getElementById('comments').style.display = 'none';
        document.getElementById('photos').style.display = 'none';

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function createPhotosList(photos) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        const pEl = document.createElement('p');
        pEl.textContent = photo.url;

        var aTag = document.createElement('a');
        aTag.setAttribute('href', photo.url);
        aTag.appendChild(pEl);

        const liEl = document.createElement('li');
        liEl.appendChild(aTag);

        ulEl.appendChild(liEl);

        document.getElementById('albums').style.display = 'none';
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    const commentsDivEl = document.getElementById('comments-content');

    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onAlbumsReceived() {
    albumsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('albums-content');

    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}


function onCommentsReceived() {
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comments-content');

    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createCommentsList(comments));
}

function onPhotosReceived() {
    photosDivEl.style.display = 'block';

    const text = this.responseText;
    const photos = JSON.parse(text);

    const divEl = document.getElementById('photos-content');

    while(divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPhotosList(photos));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function onLoadComments() {
    const el = this;
    const postId = el.getAttribute('data-post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('userid');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function onLoadPhotos() {
    const el = this;
    const albumId = el.getAttribute('data-album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const albumTdEl = document.createElement('td');
    albumTdEl.textContent = 'Photos';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(albumTdEl)

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        const userId = document.createAttribute('userid');
        userId.value = user.id;

        const albumButtonEl = document.createElement('button');
        albumButtonEl.textContent = 'Photo Albums';
        albumButtonEl.setAttributeNode(userId);
        albumButtonEl.addEventListener('click', onLoadAlbums);

        const albumTdEl = document.createElement('td');
        albumTdEl.appendChild(albumButtonEl);

        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments');
    albumsDivEl = document.getElementById('albums');
    photosDivEl = document.getElementById('photos');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
})
