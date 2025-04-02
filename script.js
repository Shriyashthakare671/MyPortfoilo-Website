let list = document.querySelectorAll(".navigation li");
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));


 // Open Drawer
function openDrawer() {
  document.getElementById('drawer').classList.add('open');
}

// Close Drawer
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
}

// Close drawer when clicking outside
window.addEventListener('click', (e) => {
  const drawer = document.getElementById('drawer');
  if (!drawer.contains(e.target) && !e.target.classList.contains('drawer-btn')) {
      drawer.classList.remove('open');
  }
});


function openTab(tabName) {
  // Remove active-link class from all tab links
  document.querySelectorAll('.tab-links').forEach(link => {
      link.classList.remove('active-link');
  });

  // Add active-link class to the clicked tab
  document.querySelector(`.tab-links[onclick="openTab('${tabName}')"]`).classList.add('active-link');

  // Hide all tab contents
  document.querySelectorAll('.tab-contents').forEach(content => {
      content.classList.remove('active-tab');
  });

  // Show the selected tab content
  document.getElementById(tabName).classList.add('active-tab');
}



function toggleDrawer() {
  const drawer = document.getElementById("drawer");
  drawer.classList.toggle("open");
}

function flipCard(event) {
  event.preventDefault();
  const cardInner = event.target.closest('.card');
  cardInner.classList.add('flipped');
}


function toggleText(id) {
  const element = document.getElementById(id);
  if (element.style.display === "none") {
      element.style.display = "block";
  } else {
      element.style.display = "none";
  }
}


function flipCardBack(event) {
  // Get the card element
  const cardInner = event.target.closest('.card');
  
  cardInner.classList.remove('flipped');
}

function sendEmail(event) {
  event.preventDefault();
  
  let formData = new FormData(event.target);
  let name = formData.get("name");
  let email = formData.get("email");
  let message = formData.get("message");
  
  let mailtoLink = `mailto:shriyashthakare671@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${name}%0AEmail:%20${email}%0AMessage:%20${message}`;
  
  window.location.href = mailtoLink;
  
  document.getElementById('contactForm').style.display = 'none';
  // document.querySelector('.success-message').style.display = 'block';
  setTimeout(() => {
    document.getElementById('thankYouMessage').style.display = 'block';
      document.querySelector('form').reset();
  }, 1000);
  
}

// Function to scroll smoothly to the selected section
function navigateTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({
          behavior: "smooth"
      });
  }
  

  closeDrawer();
}

function closeDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.classList.remove('open');
  
}

function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  // Toggle the open class to show/hide the drawer
  drawer.classList.toggle('open');
}

// Sections and corresponding icons
const sections = [
  { id: "header", icon: "home-outline" },
  { id: "about", icon: "person-outline" },
  { id: "projects", icon: "book-outline" },
  { id: "contact", icon: "call-outline" },
];

function navigateTo(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    document.getElementById("navIcon").setAttribute("name", sections.find(s => s.id === sectionId).icon);
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.getElementById(`${sectionId}-nav`).classList.add("active");
    document.getElementById("navMenu").style.display = "none";
}

function updateActiveSection() {
    let scrollPosition = window.scrollY;
    sections.forEach(section => {
        let element = document.getElementById(section.id);
        if (element) {
            let offsetTop = element.offsetTop - 100;
            let offsetBottom = offsetTop + element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                document.getElementById("navIcon").setAttribute("name", section.icon);
                document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
                document.getElementById(`${section.id}-nav`).classList.add("active");
            }
        }
    });
}

function toggleNavMenu() {
    let navMenu = document.getElementById("navMenu");
    navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
}

window.addEventListener("scroll", updateActiveSection);




