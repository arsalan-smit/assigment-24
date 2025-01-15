//localStorage.clear()
const authCheck = () => {
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    if (userUid) {
       window.location.replace("./dashboard.html")
    }

}
window.authCheck= authCheck;

import { app, auth, db, doc, getDoc, signInWithEmailAndPassword } from "./firebase.js";

const email = document.querySelector("#email")
const password = document.querySelector("#password")


async function login(){
    try {
        if (!email.value || !password.value) {
            alert("Please Enter a data")
            return
        }
        const response = await signInWithEmailAndPassword(auth, email.value, password.value)
        const uid = response.user.uid
        localStorage.setItem("uid", uid)
        window.location.replace("./dashboard.html")
    } catch (error) {
        console.log(error)
        alert(error)
    }
}
window.login= login;