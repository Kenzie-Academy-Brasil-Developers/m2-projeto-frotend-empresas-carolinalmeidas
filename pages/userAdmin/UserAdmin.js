import {allCompany, listDepartament, listUsers, hire, dimiss, createDepartament, editDepartament, deleteDepartament, deleteUser, editDepartUser} from "../../scripts/request.js";

import { toast } from "/scripts/toast.js";

const token = JSON.parse(localStorage.getItem("userToken")).token

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


async function company(){
    const company = await allCompany()
    const list = document.querySelector("#allDepartment")

    company.forEach((comp) => {
        
        list.insertAdjacentHTML("beforeend", 
        `
        <option id=${comp.uuid}>${comp.name}</option>
        
        `)
    })
}
company()

async function filterDepartament(){
  
   
    
}
filterDepartament()

async function listAllDepartament(){
    const list = await listDepartament(token)

    const ul = document.querySelector(".cards--departament_list")
    list.forEach((depart) => {
        
        ul.insertAdjacentHTML("beforeend", 
        `
            <li id=${depart.uuid}>
                <h3>${depart.name}</h3>
                <span>${depart.description}</span>
                <p>${depart.companies.name}</p>
    
                <div class="buttons">
                    <button id=${depart.uuid} class="open-company"></button>
                    <button id=${depart.uuid} class="edit-company"></button>
                    <button id=${depart.uuid} class="delete-company"></button>
                </div>
            </li>
        
        `)
    })
    edit()
    deleteModal()
    
}
listAllDepartament()

async function allUsers(){
    const list = await listUsers(token)
  
    const ul = document.querySelector(".cards--users")

    list.forEach((user) => {
        if(!user.is_admin){
            ul.insertAdjacentHTML("beforeend",
            `
            <li>
            <span>${user.username}</span>
            <p>${user.professional_level}</p>
    
            <div class="buttons">
                <button id=${user.uuid} class="edit-user"></button>
                <button  id=${user.uuid}  class="delete-user"></button>
                </div>
             </li>
            
            `)
        }

    })
    openDepartament()
    buttonEditUser()
    buttonDeleteUser()
}
allUsers()     

async function openDepartament(){

    const list = await listDepartament(token)
    const listU = await listUsers(token)

    const button = document.querySelectorAll(".open-company")
    const openDepart = document.querySelector(".openDepart")
    button.forEach((btn) => {
        btn.addEventListener("click", () => {
            
            openDepart.showModal()
            list.forEach((depart) => {
                if(btn.id == depart.uuid){
                    openDepart.id = depart.uuid
                    const h4 = document.querySelector(".nameDepart") 
                    h4.innerText = depart.name
                
                    const span = document.querySelector(".container--information > span")
                    span.innerText = depart.description
                
                    const p = document.querySelector(".container--information > p")
                    p.innerText = depart.companies.name
                    listU.forEach((user) => {
                        if(!user.is_admin && user.department_uuid != depart.uuid){
                            listaUserSelect(user)
                        }else if(!user.is_admin && user.department_uuid == depart.uuid){
                            listUserUL(user)
                        }
                    })

                }
            })                


            const btnCloseModal = document.querySelector(".btn--close__depart")
            btnCloseModal.addEventListener("click", () => {
                    openDepart.close()
                    window.location.reload(true);
             })
        })
    })
    
}

async function listaUserSelect(user){

    const select = document.querySelector("#allUsersList")
    select.insertAdjacentHTML("beforeend", 
        `
        <option id=${user.uuid}>${user.username}</option>
                
        `)
}

function listUserUL(user){
    const ul = document.querySelector(".allUsers")
    ul.insertAdjacentHTML("beforeend", 
    `
    <li>
        <span>${user.username}</span>
        <p>${user.professional_level}</p>
        <button class="btn--off" id=${user.uuid}>Desligar</button>
    </li> 
    `)
    dismissUser()
}

function buttonHireUser(){
    
    const select = document.getElementById("allUsersList")

    const button = document.querySelector(".btn--hire")
    const body = {}
    button.addEventListener("click", async() => {
        const openDepart = document.querySelector(".openDepart")
        
        const text = select.options[select.selectedIndex].id;
        
        body.user_uuid = text
        body.department_uuid = openDepart.id

        const request = await hire(token, body)

        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
    })
}
buttonHireUser()

function dismissUser(){
    const button = document.querySelectorAll(".btn--off")
    button.forEach((btn) => {
        btn.addEventListener("click", () => {
            dimiss(token, btn.id)

            toast("Usuário demitido com sucesso", "#4BA036")
            setTimeout(() => {
                window.location.reload(true)
            }, 1000)
            
        })
    })
}

async function createNewDepartament(){
    const company = await allCompany()
    const select = document.getElementById("company_uuid")
    company.forEach((comp) => {
        select.insertAdjacentHTML("beforeend", 
        `
            <option id=${comp.uuid}>${comp.name}</option>
        `)
    })
    

    const modalCreateDepart = document.querySelector(".createDepart")
    const buttonOpenModal = document.querySelector(".btn--create")
    buttonOpenModal.addEventListener("click", () => {
        modalCreateDepart.showModal()
    })

    const buttonCloseModal = document.querySelector(".btn-closeModalCreateDepart")
    buttonCloseModal.addEventListener("click", () => {
        modalCreateDepart.close()
    })

    const form = document.querySelector(".form--create__Depart")
    const elements = [...form.elements]
    form.addEventListener("submit", (e) => {
    e.preventDefault()
    const body = {}
    elements.forEach((elem) => {
        if(elem.tagName == "INPUT"){
            body[elem.id] = elem.value
            }else if(elem.tagName == "SELECT"){
                body[elem.id] = select.options[select.selectedIndex].id
            }
        })
        createDepartament(token, body)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
    })	

}
createNewDepartament()
    
async function edit(){
    const button = document.querySelectorAll(".edit-company")
    const modalEdit = document.querySelector(".edit--Depart")
    const closeEdit = document.querySelector(".btn-close__edit")
    button.forEach((btn) => {
        btn.addEventListener("click", () => {
            modalEdit.showModal()
            const id = btn.id
           
            modalEditCompany(id)
        })
    
    })
    closeEdit.addEventListener("click", () => {
        modalEdit.close()
    })
}


async function modalEditCompany(id){

    const form = document.querySelector(".form--create__Edit")
    const elements = [...form.elements]
    form.addEventListener("submit", (e) => {
    e.preventDefault()
    const body = {}
    elements.forEach((elem) => {
        if(elem.tagName == "INPUT"){
            body[elem.id] = elem.value
            }
        })
      
        editDepartament (token, body, id)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
        
    })	
    
    
}

function deleteModal(){
    const modalDelete = document.querySelector(".delete--Depart")
    const buttonDelete = document.querySelectorAll(".delete-company")
    const closeModal = document.querySelector(".btn--closeModalDelete")

    const buttonDeleteDepart = document.querySelector(".btn--deleteDepart")
    
    buttonDelete.forEach((btn) => {
        btn.addEventListener("click", () => {
            modalDelete.showModal()
            buttonDeleteDepart.id = btn.id
        })
    })
    
    closeModal.addEventListener("click", () => {
        modalDelete.close()
    })

    buttonDeleteDepart.addEventListener("click", () => {
        deleteDepartament(token, buttonDeleteDepart.id)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
    })
    

}

function buttonEditUser(){
    const buttonEdit = document.querySelectorAll(".edit-user")
    
    const modalEdit = document.querySelector(".edit--User")

    const buttonCloseModalEdit = document.querySelector(".btn--closeModalEdit")

    const form = document.querySelector(".form--Edit")

    buttonEdit.forEach((btn) => {
        btn.addEventListener("click", () => {
            modalEdit.showModal()
            form.id = btn.id
            editUserModal()
        })
    })

    buttonCloseModalEdit.addEventListener("click", () => {
        modalEdit.close()
    })

}
function editUserModal(){
    const form = document.querySelector(".form--Edit")

    const elements = [...form.elements]

    const body = {}

    form.addEventListener("submit", (e) => {
        e.preventDefault()
    
        elements.forEach((elem) => {
            if(elem.tagName == "SELECT"){
                body[elem.id] = elem.value
            }
            
        })

        editDepartUser(token, form.id, body)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
    })	
}

function buttonDeleteUser(){
    const button = document.querySelectorAll(".delete-user")
    const modalDeleteUser = document.querySelector(".delete--User")

    const buttonDelet = document.querySelector(".btn--deleteUser")

    const buttonModalClose = document.querySelector(".btn--closeModalDeleteUser")

    button.forEach((btn) => {
        btn.addEventListener("click", () => {
      
            modalDeleteUser.showModal()
            buttonDelet.id = btn.id
            
        })
    })
    buttonModalClose.addEventListener("click", () => {
        modalDeleteUser.close()
    })
    
    buttonDelet.addEventListener("click", () => {
       
       deleteUser(token, buttonDelet.id)
        setTimeout(() => {
            window.location.reload(true)
        }, 1000)
        
    })
}
