// document.addEventListener("DOMContentLoaded", () => {

//     AOS.init({
//         duration: 1000,
//         once: true
//     });

//     const themeToggle =
//         document.getElementById("theme-toggle");

//     if(localStorage.getItem("theme")==="light"){
//         document.body.classList.add("light-mode");
//     }

//     themeToggle?.addEventListener("click",()=>{

//         document.body.classList.toggle("light-mode");

//         localStorage.setItem(
//             "theme",
//             document.body.classList.contains("light-mode")
//                 ? "light"
//                 : "dark"
//         );

//     });

//     VanillaTilt.init(
//         document.querySelectorAll(".project-card"),
//         {
//             max:15,
//             speed:400,
//             glare:true,
//             "max-glare":0.3
//         }
//     );

// });