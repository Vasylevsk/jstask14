const API_URL = "https://jsonplaceholder.typicode.com/users";

const contactsListEl = document.querySelector("#contactsList");
const contactTemplate = document.querySelector("#contactTemplate").innerHTML;

let contactsList = [];

init();

function init() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      contactsList = data;
      console.log(data);
      renderList();
    });
}

function generateContactHtml(contact) {
  return interpolate(contactTemplate, contact);
}

function interpolate(template, obj) {
  for (key in obj) {
    template = template.replaceAll(`{{${key}}}`, obj[key]);
    if (typeof obj[key] === "object") {
      template = interpolate(template, obj[key]);
    }
  }
  return template;
}

function renderList() {
  contactsListEl.innerHTML = contactsList.map(generateContactHtml).join("\n");
}
