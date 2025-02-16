class Sidebar {
    static createSidebar () {
        //--Costanti
        const openBtn = document.getElementById("open_sidebar");
        const closeBtn = document.getElementById("close_sidebar");
        const sidebar = document.querySelector(".sidebar");
        
        //--Event listener
        openBtn.addEventListener("click", () => {
            sidebar.classList.remove("hidden");
            openBtn.classList.add("hidden");
        });
        
        closeBtn.addEventListener("click", () => {
            sidebar.classList.add("hidden");
            openBtn.classList.remove("hidden");
        });
    }
}

export default Sidebar;