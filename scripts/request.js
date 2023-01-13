const baseUrl = "http://localhost:6278";

import { toast } from "./toast.js";
export async function register(user) {
    
    const newUser = await fetch(baseUrl + "/auth/register", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })

    if(!newUser.ok){
        toast("Dados inválidos, tente novamente", "#CE4646")
        
    }else{
        toast("Criação de usuário bem sucedida", "#4BA036")
        setTimeout(() => {
            window.location.replace("/pages/login/login.html")
        }, 1000)
    }
    
    return newUser
}

export async function login(data) {
    const loginData = await fetch(baseUrl + "/auth/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(err => console.log(err))

     return loginData
}

export async function  verification(token){
    const tokenUser = await fetch (baseUrl + "/auth/validate_user", {
        method: "GET",
        headers: { 
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(response => {
        if(response.is_admin){
            setTimeout(() => {
                window.location.replace("/pages/userAdmin/userAdmin.html")
            }, 1000)
        }else{
            setTimeout(() => {
                window.location.replace("/pages/allUser/allUser.html")
            }, 1000)
            
        }
    })
    .catch(err => console.error(err));

    return tokenUser
}

export async function aboutUser(token){
    const user = await fetch (baseUrl + "/users/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(response => localStorage.setItem("user", JSON.stringify(response)))
    .catch(err => console.log(err))

    return user

}

export async function aboutCompany(token){
   const company = await fetch(baseUrl + "/users/departments", {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(response => response)
  .catch(err => err);

  return company
}

export async function employees(token){
    const allemployees = await fetch(baseUrl + "/users/departments/coworkers", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}` 
        }
      })
      .then(response => response.json())
      .then(response => response)
      .catch(err => err);

      return allemployees
}

export async function edit(token, user){
    const informationEdit = await fetch(baseUrl + "/users", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(response => {
        localStorage.setItem("user", JSON.stringify(response))
    })
    .catch(err => console.log(err))

    return informationEdit
        
}

export async function allCompany(){
    const list = await fetch(baseUrl + "/companies", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
      })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err))

    return list
}
export async function listDepartament(token){
    const list = await fetch(baseUrl + "/departments", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

        return list
}
export async function listUsers(token){
    const users = await fetch( baseUrl + "/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));

    return users
}
export async function hire(token, user){
    const userHire = await fetch(baseUrl + "/departments/hire/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
        body: JSON.stringify(user)
    })
  .then(response => response.json())
  .then(response => response)
  .catch(err => console.error(err));

  return userHire
}
export async function dimiss(token ,id){
    const userDimiss = await fetch(baseUrl + `/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err))

        return userDimiss
}
export async function createDepartament(token, user){
    const newDepart = await fetch(baseUrl + "/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

        return newDepart
}
export async function editDepartament (token, user, id){
    const editDepart = await fetch(baseUrl + `/departments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err))

      return editDepart
}

export async function deleteDepartament(token, id){
    const deleteDep = await fetch(baseUrl + `/departments/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err))

      return deleteDep
}

export async function editDepartUser(token, id, user){
       const editUser = await fetch(baseUrl + `/admin/update_user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err))

      return editUser
}

export async function deleteUser(token, id){
    const user = await fetch(baseUrl + `/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .catch(err => console.error(err))

      return user
}

export async function sectors(){
   const sect = await fetch(baseUrl + "/sectors", {
  method:"GET",
  header: {
    "Content-Type": "application/json",
  }
})
  .then(response => response.json())
  .then(response => response)
  .catch(err => console.error(err));

  return sect
}