
import { login, verification, aboutUser} from "../../scripts/request.js"

import { toast } from "/scripts/toast.js";

function modalButtons(){
    const button = document.querySelector(".btn-mobile")
    const modalButtons = document.querySelector("dialog")
    button.addEventListener("click", (event) => {
        event.preventDefault()
        button.classList.toggle("btn--modal_close")

        if(button.className == "btn-mobile btn--modal_close"){
            modalButtons.show()

        }else{
            modalButtons.close()
        }
    })


}
modalButtons()

function openPages(){
    const buttonsHome = document.querySelectorAll(".container--btn_home")
    buttonsHome.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.replace("/index.html")
            }, 1000);
        })
    })

    const buttonRegister = document.querySelectorAll(".container--btn_register")
    buttonRegister.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.replace("/pages/register/register.html")
            }, 1000);

        })
    })

}
openPages()

function loginForm() {
    const inputs = document.querySelectorAll("form > input")
    const button = document.querySelector ("form > button")
     const loginUsers = {}

     button.addEventListener("click", async (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            loginUsers[input.id] = input.value
        })

        const request = await login(loginUsers)
        
       
        if(request.error){
           
            toast("Dados inválidos, tente novamente", "#CE4646")
        }else{
       
            localStorage.setItem("userToken", JSON.stringify(request))

            verificationTypeUser()
        }
        
     })
}
loginForm()

async function verificationTypeUser(){
    const token = (JSON.parse(localStorage.getItem("userToken"))).token

    verification(token)
    aboutUser(token)

}
