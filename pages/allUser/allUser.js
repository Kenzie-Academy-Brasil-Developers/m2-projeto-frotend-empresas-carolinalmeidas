import {aboutCompany, employees, edit} from "../../scripts/request.js";

const token = JSON.parse(localStorage.getItem("userToken")).token
const dados = JSON.parse(localStorage.getItem("user"))



function logout(){
    const buttonLogout = document.querySelector(".btn--logout")
    buttonLogout.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.clear()
            setTimeout(() => {
                window.location.replace("/index.html")
            }, 1000);
        })
}
logout()

async function user(){

    const name = document.querySelector("#name-User")
    name.innerText = dados.username

    const email = document.querySelector("#email-User")
    email.innerText = dados.email

    const profLevel = document.querySelector("#professional_level-user")
    profLevel.innerText = dados.professional_level

    const typeJob = document.querySelector("#type-job")

    if(!dados.kind_of_work){
        typeJob.innerText = ""
    }else{
        typeJob.innerText = dados.kind_of_work
    }
    
    
}
user()

async function companyEndDepartament(){
    
    const text = document.querySelector('#text')
    const uuidDepartament = dados.department_uuid

    const company = await aboutCompany(token)
 
    if(company.error){
        text.innerText = "Você ainda não foi contradado(a)"
    }else{
        const div = document.querySelector(".container--companyName")
        div.classList.remove("container--companyName")
        div.classList.add("userHired")

        const departments = company.departments
        departments.forEach((depart) => {
            if(depart.uuid == uuidDepartament){
                text.innerText = company.name + " - " +  depart.name
            }
        })


    }
}
companyEndDepartament()

async function employeesOfCompany(){
    const ul = document.querySelector(".cards--Company")
    const employeesCompany = await employees(token)
    employeesCompany.forEach((company) => {
        const users = company.users
        users.forEach((user) => {
            if(user.uuid !== dados.uuid){

                ul.insertAdjacentHTML("beforeend", 
                `
                <li>
                    <span>${user.username}</span>
                    <p>${user.professional_level}</p>
                </li>
                
                `)
            }
        })
    })
    
}
employeesOfCompany()

function editUser(){
    const buttonEdit = document.querySelector(".btn--edit")
    const modalEdit = document.querySelector("dialog")

    const form = document.querySelector("form")
    const elements = [...form.elements]
   
    const buttonCloseEdit = document.querySelector(".btn-close")
    buttonEdit.addEventListener("click", (e) => {
        e.preventDefault()

        modalEdit.showModal()
    })

    buttonCloseEdit.addEventListener("click", (e) =>{
        e.preventDefault()
        modalEdit.close()
    }
    )

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const body = {}
        elements.forEach((element) => {
            if(element.tagName == "INPUT" || element.tagName == ""){
                body[element.id] = element.value
            }
        })
        await edit(token, body)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
    })

}
editUser()
