function fetchImages() {
    const apiUrl = 'https://pixabay.com/api/?key=40846922-9fac9d82deada4c2fb81abdc5&q=flowers&image_type=photo&pretty=true';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.hits) {
                displayImages(data.hits);
            } else {
                console.error('Error fetching images:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}


function displayImages(images) {
    const galleryElement = document.getElementById('gallery');
    galleryElement.innerHTML = '';

    images.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        imageCard.setAttribute('data-id', image.id);

        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.setAttribute('class', 'imageStyle');

        const likeBtn = document.createElement('span');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = `👍 ${image.likes}`;
        likeBtn.addEventListener('click', () => likeImage(image.id));

        const commentBtn = document.createElement('button');
        commentBtn.classList.add('comment-btn');
        commentBtn.textContent = 'Comment';
        commentBtn.addEventListener('click', () => showCommentForm(image.id));

        const commentCount = document.createElement('span');
        commentCount.classList.add('comment-count');
        commentCount.textContent = `(comments: ${image.comments})`;

        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card');

        commentCard.appendChild(commentCount);
        commentCard.appendChild(commentSection);

        imageCard.appendChild(imgElement);
        imageCard.appendChild(likeBtn);
        imageCard.appendChild(commentBtn);
        imageCard.appendChild(commentCard);

        galleryElement.appendChild(imageCard);

    });
}

function showCommentForm(imageId) {
    const username = prompt('Enter your username:');
    const comment = prompt('Enter your comment:');

    if (username && comment) {
        submitComment(imageId, username, comment);
    }
}

const imageComments = {};
const likesCount = {};


function likeImage(imageId) {
    if (!likesCount[imageId]) {
        likesCount[imageId] = 0;
    }

    likesCount[imageId]++;

    const likeBtn = document.querySelector(`.image-card[data-id="${imageId}"] .like-btn`);
    likeBtn.textContent = `👍 ${likesCount[imageId]}`;
}

function submitComment(imageId, username, comment) {
    if (!imageComments[imageId]) {
        imageComments[imageId] = [];
    }

    const formattedComment = `${username}: ${comment}`;
    imageComments[imageId].push(formattedComment);

    const commentSection = document.querySelector(`.image-card[data-id="${imageId}"] .comment-section`);
    const commentCount = document.querySelector(`.image-card[data-id="${imageId}"] .comment-count`);

    const commentParagraph = document.createElement('p');
    commentParagraph.textContent = formattedComment;
    commentSection.appendChild(commentParagraph);

    commentCount.textContent = `(comments: ${imageComments[imageId].length})`;
}

window.onload = fetchImages;
