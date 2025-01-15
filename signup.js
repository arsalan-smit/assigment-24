import {
    getAuth,
    createUserWithEmailAndPassword, auth, db, doc, setDoc } from "./firebase.js";

let firstName = document.querySelector("#first-name")
let lastName = document.querySelector("#last-name")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirmPassword = document.querySelector("#confirm-password")

//localStorage.clear()
const authCheck = () => {
    console.log("i ma authCheck")
    const userUid = localStorage.getItem("uid")
    console.log("userUid", userUid)
    if (userUid) {
    window.location.replace("./index.html")
    }

}
window.authCheck = authCheck;


window.SignIn= SignIn;
async function SignIn(){
    try {
        if (!firstName || !lastName || !email.value || !password.value || !confirmPassword) {
            alert("Please Enter a data")
            return
        }
        if(password.value !== confirmPassword.value){
            alert("enter a bhot password same")
            return
        }
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log(response, "response")
        await setDoc(doc(db, "BlogUsers", response.user.uid), {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        })
        firstName.value='';
        lastName.value='';
        email.value='';
        password.value='';
        confirmPassword.value='';
        window.location.href = "./index.html"
        alert("User successfully Created!");


    } catch (error) {
        console.log(error)
        alert(error)
    }
}
