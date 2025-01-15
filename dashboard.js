import {
  collection,
  getDocs,
  addDoc,
  db,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "./firebase.js";
//localStorage.clear()
const authCheck = async () => {
  const userUid = localStorage.getItem("uid");
  //   console.log("userUid", userUid);
  if (!userUid) {
    window.location.replace("./index.html");
  }
};
window.authCheck = authCheck;

let createBtn = document.querySelector("#createBtn");
let writeBlogContainer = document.querySelector("#writeBlogContainer");
let saveBtn = document.querySelector("#saveBtn");

//create Blog
createBtn.addEventListener("click", () => {
  createBtn.style.display = "none";
  writeBlogContainer.style.display = "flex";
});

// writeBlogContainer.style.display= "none"
//     createBtn.style.display= "block"

//save Blog
async function postBlog() {
  try {
    let title = document.querySelector("#title");
    let textarea = document.querySelector("#textarea");
    let checkbox = document.querySelector("#checkbox");
    const blogObj = {
      title: title.value,
      textarea: textarea.value,
      isPrivate: checkbox.checked,
      uid: localStorage.getItem("uid"),
    };
    //let uid = localStorage.getItem("uid");
    let addDocVariable = await addDoc(collection(db, "NewUserBlogsContent"), blogObj);
    alert("blog created successfully!");
    title.value ='';
    textarea.value='';
    checkbox.checked= false;
    writeBlogContainer.style.display = "none";
    createBtn.style.display = "block";
    getPost();
  } catch (error) {
    console.log(error);
  }
}
window.postBlog = postBlog;

//getPost()
async function getPost() {
  try {
    let post = document.querySelector("#post");
    const querySnapshot = await getDocs(collection(db, "NewUserBlogsContent"));
    post.innerHTML = "";
    querySnapshot.forEach((doc) => {
      if (doc.data().isPrivate) {
        if (doc.data().uid === localStorage.getItem("uid")) {
          post.innerHTML += `<div class="post-content" id="post-content" style="display:block;" >
                    <h1 class="post-title" >${doc.data().title}</h1>
                <p class="post-description">${doc.data().textarea}</p>
                ${
                  doc.data().uid === localStorage.getItem("uid")
                    ? `<button class='editBtn' onclick='updateBlog(this)' id=${doc.id}>Edit</button> <button class='deleteBtn' id=${doc.id}>Delete</button>`
                    : ""
                }
                 <label for="email">${
                   doc.data().isPrivate ? "Private" : "Public"
                 }</label></div>`;
        }
      } else {
        post.innerHTML += `<div class="post-content" id="post-content" style="display:block;" >
                <h1 class="post-title">${doc.data().title}</h1>
                <p class="post-description">${doc.data().textarea}</p>
                ${
                  doc.data().uid === localStorage.getItem("uid")
                    ? `<button class='editBtn' onclick='updateBlog(this)' id=${doc.id}>Edit</button> <button class='deleteBtn' onclick='deleteBlog(this)' id=${doc.id}>Delete</button>`
                    : ""
                }
                 <label for="email">${
                   doc.data().isPrivate ? "Private" : "Public"
                 }</label></div>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
window.getPost = getPost;

//update blog
async function updateBlog(e) {
  console.log("update blog");
  try {
    let oldBlogContent = e.previousElementSibling.innerText;
    let oldBlogTitle =
      e.previousElementSibling.previousElementSibling.innerText;
    var updatedTitle = prompt(
      "Enter the updated title",
      `${oldBlogTitle}`.trim()
    );
    var updatedContent = prompt(
      "Enter the update tasks",
      `${oldBlogContent}`.trim()
    );
    if (!updatedTitle || !updatedContent) {
      alert("Both Title and Content must be updated!");
      return;
    }
    const UpdatedBlogContent = doc(db, "NewUserBlogsContent", e.id);
    await updateDoc(UpdatedBlogContent, {
      title: updatedTitle,
      textarea: updatedContent,
    });
    getPost();
  } catch (error) {
    console.log(error);
  }
}
window.updateBlog = updateBlog;


async function deleteBlog(e) {
  console.log("delete")
  await deleteDoc(doc(db, "NewUserBlogsContent", e.id));
  getPost();
}
window.deleteBlog= deleteBlog;