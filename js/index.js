let today = new Date();
let thisYear = today.getFullYear();
console.log(thisYear);

const footer = document.querySelector("footer");

const myName = "Krista Zaloudek";

const copyright = document.createElement("p");

copyright.innerHTML = `${myName} <span class="jsCopyrightSpan">&copy ${thisYear}</span>`;
copyright.addClassName = "jsCopyright";

footer.appendChild(copyright);

let skills = [
  "html",
  "javascript",
  "business analysis",
  "user acceptance testing",
  "manual testing",
];

let skillsSection = document.getElementById("skills");

let skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.classList.add("jsTag");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

const messageForm = document.getElementById("messageForm");

const messageSection = document.getElementById("messages");

messageSection.style.display = "none";

let messageCount = 0;

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = e.target.usersName.value;
  let userEmail = e.target.usersEmail.value;
  let userMessage = e.target.usersMessage.value;

  messageSection.style.display = "";
  messageCount++;

  //let messageList = messageSection.getElementsByTagName("ul");
  let messageList = document.getElementById("messageList");

  let newMessage = document.createElement("li");

  newMessage.innerHTML = `<a href="${userEmail}" mailto:"${userEmail}">${userName}</a> - wrote:<span class="jsUserMessageSpan">${userMessage}</span>`;

  let removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");

  removeButton.value = "remove";
  removeButton.classList.add("jsBtn");

  newMessage.appendChild(removeButton);

  messageList.append(newMessage);

  removeButton.addEventListener("click", (e) => {
    let entry = removeButton.parentNode.parentNode;
    entry.removeChild(newMessage);
    messageCount--;
    if (messageCount === 0) {
      messageSection.style.display = "none";
    }
  });

  e.target.reset();
});


fetch("https://api.github.com/users/KZeeMe/repos", { mode: "cors" })
  .then(function (githubRequest) {
    return githubRequest.json();
  })
  .then(function (githubRequest) {
    const repositories = githubRequest;
    console.log(repositories);

    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    for (let i = 0; i < repositories.length; i++) {
      let project = document.createElement("li");
      let projectDate = repositories[i].created_at;

      let projectYear = projectDate.slice(0, 4);
      let projectMonth = projectDate.slice(5, 7);
      let projectDay = projectDate.slice(8, 10);
      let formattedDate = `${projectMonth}-${projectDay}-${projectYear}`;

      // Hide Github repos that are empty
      if (repositories[i].size != 0) {
        project.innerHTML = `<a href="${repositories[i].svn_url}" target="_blank">${repositories[i].name}</a> created ${formattedDate}`;
        projectList.appendChild(project);
      }
    }
  });
