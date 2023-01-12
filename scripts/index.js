const baseUrl = "http://localhost:6278"
async function listCompany(){
    const allCompany = await fetch("http://localhost:6278/companies", {
        "method": "GET",
        "headers": {
          "Authorization": "application/json"
        }
      })
    .then(response => response.json())
    .then(response => {
        const company = response
        cardsCompany(company)
    })
    .catch(err => console.error(err));

    return allCompany
}
listCompany()

async function cardsCompany(array){
    
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
