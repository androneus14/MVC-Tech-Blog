const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_content = document.querySelector('#comment-post').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);