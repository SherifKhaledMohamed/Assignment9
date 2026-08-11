/* placeholder bg classes */

var imagePlaceholderClasses = [
  "bg-linear-to-br-vi500-pu600",
  "bg-linear-to-br-em500-te600",
  "bg-linear-to-br-ro500-pi600",
  "bg-linear-to-br-am500-or600",
  "bg-linear-to-br-cy500-bl600",
  "bg-linear-to-br-in500-vi600",
  "bg-linear-to-br-fu500-pi600",
];

/* summaries labels */
var summaryTotalContactsLabel = document.getElementById(
  "summaryTotalContactsLabel",
);

var summaryTotalFavouritesContactsLabel = document.getElementById(
  "summaryTotalFavouritesContactsLabel",
);

var summaryTotalEmergencyContactsLabel = document.getElementById(
  "summaryTotalEmergencyContactsLabel",
);

/* header label */
var totalContactsHeaderLabel = document.getElementById(
  "totalContactsHeaderLabel",
);

/* searchbar Input */
var searchbarInput = document.getElementById("searchbarInput");

/* no contacts Divs */
var noContactsDiv = document.getElementById("noContacts");
var noFavouritesDiv = document.getElementById("noFavourites");
var noEmergencyDiv = document.getElementById("noEmergency");

/* Lists */
var contactListHTML = document.getElementById("contactList");
var favouriteListHTML = document.getElementById("favouriteList");
var emergencyListHTML = document.getElementById("emergencyList");

/* Form Inputs*/
var inputsModalLabel = document.getElementById("inputsModalLabel");
var contactImagePreview = document.getElementById("contactImagePreview");
var contactImagePreviewFallback = document.getElementById(
  "contactImagePreviewFallback",
);
var contactImageInput = document.getElementById("contactImage");
var fullNameInput = document.getElementById("fullName");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var isFavouriteInput = document.getElementById("isFavourite");
var isEmergencyInput = document.getElementById("isEmergency");

/* Form Buttons */

var cancelButton = document.getElementById("cancelButton");
var saveButton = document.getElementById("saveButton");

/* Contacts Object */

var contactList = JSON.parse(localStorage.getItem("contactContainer")) || [];
var contact = {
  name: "Sherif Khaled Mohamed",
  phoneNumber: "01115807827",
  email: "sherifkhaledmohamed97@gmail.com",
  contactAddress: "1st Settlement, New Cairo, Egypt",
  contactGroup: "",
  contactNotes: "",
  isFavouriteContact: false,
  isEmergencyContact: false,
  contactImage: "",
};

/* Functions */
function addOrUpdate(index) {
  if (
    validateInputs(fullNameInput, msgName) &&
    validateInputs(phoneInput, msgPhone) &&
    validateInputs(emailInput, msgEmail) &&
    validateInputs(addressInput, msgAddress)
  ) {
    var contact = {
      name: fullNameInput.value,
      phoneNumber: phoneInput.value,
      email: emailInput.value,
      contactAddress: addressInput.value,
      contactGroup: groupInput.value,
      contactNotes: notesInput.value,
      isFavouriteContact: isFavouriteInput.checked,
      isEmergencyContact: isEmergencyInput.checked,
      contactImage: contactImageInput.files[0]
        ? `images/${contactImageInput.files[0].name}`
        : "images/{}.jpg",
    };

    if (index === -1) {
      contactList.push(contact);
    } else {
      contactList.splice(index, 1, contact);
    }
    localStorage.setItem("contactContainer", JSON.stringify(contactList));

    DisplayContacts();
  }
}

function setAddOrUpdate(index) {
  var saveButtonDiv = document.getElementById("saveButtonDiv");

  if (index === -1) {
    saveButtonDiv.innerHTML = `<button
                    id="saveButton"
                    class="w-100 fw-semibold text-light rounded-3" onclick="addOrUpdate(-1)"
                  >
                    <i class="fa-solid fa-check"></i> Save Contact
                  </button>`;
  } else {
    saveButtonDiv.innerHTML = `<button
                    id="saveButton"
                    class="w-100 fw-semibold text-light rounded-3" onclick="addOrUpdate(${index})"
                  >
                    <i class="fa-solid fa-check"></i> Save Contact
                  </button>`;
  }
}

function DisplayContacts() {
  DisplayTotalList();
  DisplayFavouriteList();
  DisplayEmergencyList();
}

function DisplayTotalList() {
  var htmlPlaceholder = "";
  if (contactList.length > 0) {
    totalContactsHeaderLabel.innerHTML = contactList.length;
    summaryTotalContactsLabel.innerHTML = contactList.length;
    noContactsDiv.classList.add("d-none");
  }
  ("");
  for (var i = 0; i < contactList.length; i++) {
    htmlPlaceholder += `
        <div class="col-md-6">
                    <div class="contact">
                      <div
                        class="card my-contact-card bg-white shadow-sm rounded-4"
                      >
                        <div class="card-content p-4">
                          <div
                            class="header d-flex justify-content-start align-items-center gap-3 pb-3"
                          >
                            <div
                              class="contactImagePlaceholder rounded-3 position-relative d-flex justify-content-center align-items-center"
                            >
                            ${contactList[i].contactImage !== "images/{}.jpg" ? `<img src="${contactList[i].contactImage}" class="contactImage w-100 h-100 object-fit-cover d-block rounded-3" alt="Contact Image"/>` : `<span class="contactImageLetter fw-semibold text-light">${contactList[i].name.slice(0, 2).toUpperCase()}</span>`}
                              <span
                             ${
                               contactList[i].isFavouriteContact
                                 ? `class="favouritedContact d-flex justify-content-center align-items-center rounded-circle bg-warning position-absolute border-white"
                                ><i class="fa-solid fa-star text-white"></i
                              ></span>`
                                 : ``
                             }
                              ${
                                contactList[i].isEmergencyContact
                                  ? `<span
                                class="emergencyContact d-flex justify-content-center align-items-center rounded-circle bg-danger position-absolute border-white"
                                ><i
                                  class="fa-solid fa-heart-pulse text-white"
                                ></i
                              ></span>`
                                  : ""
                              }
                            </div>
                            <div class="contact-info">
                              <h3 class="contactName fw-semibold text-black">
                                ${contactList[i].name}
                              </h3>
                              <div
                                class="number d-flex justify-content-start align-self-center gap-2"
                              >
                                <span
                                  class="phone-icon rounded-2 d-flex justify-content-center align-items-center"
                                  ><i class="fa-solid fa-phone"></i
                                ></span>
                                <span class="contactNumber text-muted fw-normal"
                                  >${contactList[i].phoneNumber}</span
                                >
                              </div>
                            </div>
                          </div>
                          ${
                            contactList[i].email === ""
                              ? `<div
                            class="mail d-flex justify-content-start align-items-center gap-3 pb-3"
                          >
                            <span
                              class="icon rounded-2 d-flex justify-content-center align-items-center"
                              ><i class="fa-solid fa-envelope"></i
                            ></span>
                            <span class="contactEmail fw-normal text-muted"
                              >${contactList[i].email}</span
                            >
                          </div>`
                              : ``
                          }
                          ${
                            contactList[i].address === ""
                              ? `<div
                            class="addressDiv d-flex justify-content-start align-items-center gap-3 pb-3"
                          >
                            <span
                              class="icon rounded-2 d-flex justify-content-center align-items-center"
                              ><i class="fa-solid fa-envelope"></i
                            ></span>
                            <span class="contactAddress fw-normal text-muted"
                              >${contactList[i].address}</span
                            >
                          </div>`
                              : ``
                          }
                          
                          <div
                            class="contact-tags d-flex justify-content-start align-items-center gap-2"
                          >
                            <span class="groupTag px-2 py-1 ${contactList[i].contactGroup}-tag rounded-3"
                              >${contactList[i].contactGroup}</span
                            >
                            ${
                              contactList[i].isEmergencyContact
                                ? `<span class="px-2 py-1 rounded-3"
                              ><i class="fa-solid fa-heart-pulse"></i>
                              Emergency</span
                            >`
                                : ``
                            }
                          </div>
                        </div>
                        <div class="card-footer my-card-footer px-4">
                          <div
                            class="w-100 d-flex justify-content-between align-content-center"
                          >
                            <div
                              class="actions d-flex justify-content-start align-content-center gap-2 me-auto"
                            >
                              <a
                                href="tel:${contactList[i].phoneNumber}"
                                class="callContact d-flex justify-content-center align-items-center text-decoration-none rounded-3"
                                ><i class="fa-solid fa-phone"></i
                              ></a>
                              ${
                                contactList[i].email !== ""
                                  ? `<a
                                href="mailto:${contactList[i].email}"
                                class="mailContact d-flex justify-content-center align-items-center text-decoration-none rounded-3"
                                ><i class="fa-solid fa-envelope"></i
                              ></a>`
                                  : ``
                              }
                              
                            </div>
                            <div
                              class="edits d-flex justify-content-start align-items-center gap-1 ms-auto"
                            >
                              <button
                                class="favouriteButton d-flex justify-content-center align-items-center notfavourite rounded-3"
                              >
                                <i class="fa-regular fa-star"></i>
                              </button>
                              <button
                                class="emergencyButton d-flex justify-content-center align-items-center notemergency rounded-3"
                              >
                                <i class="fa-regular fa-heart"></i>
                              </button>
                              <button
                                class="editButton d-flex justify-content-center align-items-center rounded-3"
                              >
                                <i class="fa-solid fa-pen"></i>
                              </button>
                              <button
                                class="deleteButton d-flex justify-content-center align-items-center rounded-3"
                              >
                                <i class="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        `;
  }
}
function DisplayFavouriteList() {}
function DisplayEmergencyList() {}

function validateInputs(element, msg) {
  var regex = {
    fullName: /^[A-Za-z ]{2,50}$/,
    phone: /^01(0|1|2)[0-9]{8}$/,
    email: /^([A-Za-z_0-9\-]{2,30}\@[a-z\-]{2,20}\.[a-z]{2,6}){0,}$/,
    address: /^[A-Za-z \,]{0,50}$/,
  };
  var msg = document.getElementById(msg.id);

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    msg.classList.add("d-none");

    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");

    msg.classList.remove("d-none");
    return false;
  }
}
