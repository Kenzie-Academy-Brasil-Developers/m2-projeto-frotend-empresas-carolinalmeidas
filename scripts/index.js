const baseUrl = "http://localhost:6278"

import { sectors, allCompany } from "../scripts/request.js";

const list = await allCompany()

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
    const buttonsLogin = document.querySelectorAll(".container--btn_login")
    buttonsLogin.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.replace("pages/login/login.html")
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

async function allSectors(){
    const sector = await sectors()
    const select = document.querySelector("#company")

    sector.forEach((sect) => {
            select.insertAdjacentHTML("beforeend", 
            `
                <option id=${sect.uuid}>${sect.description}</option>
            `)
    })

}
allSectors()

async function filter(){
    const select = document.querySelectorAll("#company")
    select.forEach((option) => {
     
        option.addEventListener("click", () => {
            const ul = document.querySelector(".cards--company")
            ul.innerHTML = ""
            list.forEach((elem) => {


                const id = option.options[option.selectedIndex].id
                
                if(id == ""){
                    cardsCompanyFilter(elem)
                }else if(id == elem.sectors.uuid){

                    cardsCompanyFilter(elem)
                }   
            })
            
        })
        
    })
    

}
filter()

function cardsCompany(array){
    const ul = document.querySelector(".cards--company")
    array.forEach((element) => {
        ul.insertAdjacentHTML("beforeend", 
        `
            <li>
                <h1>${element.name}</h1>
                <span>${element.opening_hours}</span>
                <p>${element.sectors.description}</p>
            </li>
        `)
    })

}
cardsCompany(list)

function cardsCompanyFilter(element){
    const ul = document.querySelector(".cards--company")

        ul.insertAdjacentHTML("beforeend", 
        `
            <li>
                <h1>${element.name}</h1>
                <span>${element.opening_hours}</span>
                <p>${element.sectors.description}</p>
            </li>
        `)


}
