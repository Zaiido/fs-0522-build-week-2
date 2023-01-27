const getLoginData = () => {
    let loginButtonNode = document.querySelector(".btn-login");
    loginButtonNode.addEventListener("click", () => {
        let userEmailOrName = document.querySelector("#userEmailUsername").value;
        let userPassword = document.querySelector("#userPassword").value;
        if (userEmailOrName !== "" && userPassword !== "") {
            localStorage.setItem('userEmailOrName', userEmailOrName)
            location.replace("homepage.html")
        } else {
            document.querySelector("#userEmailUsername").classList.add("required")
            document.querySelector("#userPassword").classList.add("required")
        }
    })
}



window.onload = () => {
    getLoginData()
}