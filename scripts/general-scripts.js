
const toggleProfileDropdown = () => {
    let user = localStorage.getItem('userEmailOrName');
    document.querySelector(".profile-name").innerText = user;
    let profileNode = document.querySelector(".profile")
    profileNode.addEventListener("click", () => {
        let svgNode = document.querySelector(".down-arrow")
        let dropdownMenu = document.querySelector(".dropdown-menu")
        if (svgNode.hasAttribute("transform")) {
            svgNode.removeAttribute("transform")
            dropdownMenu.classList.replace("d-block", "d-none")
        }
        else {
            svgNode.setAttribute("transform", "rotate(180)")
            dropdownMenu.classList.replace("d-none", "d-block")
        }
    })
}

toggleProfileDropdown()

