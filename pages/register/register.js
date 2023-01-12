import { register } from "/scripts/request.js";



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
                window.location.replace("/pages/login/login.html")
            }, 1000);
        })
    })

    const buttonHome = document.querySelectorAll(".container--btn_home")
    buttonHome.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            setTimeout(() => {
                window.location.replace("/index.html")
            }, 1000);

        })
    })

    const buttonReturn = document.querySelector(".btn--retorn")
    buttonReturn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("ok")
        setTimeout(() => {
            window.location.replace("/index.html")
        }, 1000);
    })

}
openPages()


const eventRegister = () => {
    const form = document.querySelector("form")
	const elements = [...form.elements]
 
   
	form.addEventListener("submit", async (e) => {
		e.preventDefault()

		const body = {}

		elements.forEach((elem) => {

            if(elem.tagName == "INPUT" || elem.tagName == "SELECT" && elem.value !== ""){
                body[elem.id] = elem.value
            }
			
            
		})

        await register(body)

	})	
}

eventRegister()