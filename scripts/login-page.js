const getLoginData = () => {
    let loginButtonNode = document.querySelector(".btn-login");
    loginButtonNode.addEventListener("click", () => {
        let userEmailOrName = document.querySelector("#userEmailUsername").value;
        localStorage.setItem('userEmailOrName', userEmailOrName)
        location.replace("homepage.html")
    })
}

getLoginData()