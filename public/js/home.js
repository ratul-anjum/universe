const startPostInp = document.getElementById("start-post-input");
const userPost = document.getElementById("post");
const cross = document.getElementById("cross");

startPostInp.addEventListener("focus", () => {
    setTimeout(() => {
        userPost.style.display = "block";
    }, 500)
});
cross.addEventListener("click", () => {
    userPost.style.display = "none";
});


// Submit A Post
const createPostForm = document.querySelector("#user-post > form");
createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch("/home/post", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (result.errors) {
        let errMsg;
        Object.values(result.errors).map((err) => {
            errMsg = err.msg;
        })

        // Error Toast 
        const errorToast = Toastify({
            text: `${errMsg}`,
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #f4084f, #f0ab21)",
            }
        });
        errorToast.showToast();
    } else {
        createPostForm.reset();

        // Success Toast
        const successToast = Toastify({
            text: " Posted Successfully !",
            duration: 1000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        });
        successToast.showToast();

        setTimeout(() => {
            location.reload();
        }, 1000);
    }
});