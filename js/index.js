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
var contactImageInput = document.getElementById("contactImage");
var fullNameInput = document.getElementById("fullName");
var phoneInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var isFavouriteInput = document.getElementById("isFavourite");
var isEmergencyInput = document.getElementById("isEmergency");
var contactImagePreviewFallbackInput = document.getElementById("contactImagePreviewFallback");

/* Form Buttons */

var cancelButton = document.getElementById("cancelButton");
var saveButton = document.getElementById("saveButton");

/* toggle Buttons */

var favouriteBtn = document.getElementById("favouriteBtn");
var emergencyBtn = document.getElementById("emergencyBtn");

/* Contacts List */

var contactList = [];

if(localStorage.getItem("contactContainer"))
{
  contactList = JSON.parse(localStorage.getItem("contactContainer"));
  DisplayContacts();
}

/* Functions */
function addOrUpdate(index) {
  if (
    validateInputs(fullNameInput, msgName) &&
    validateInputs(phoneInput, msgPhone) &&
    validateInputs(emailInput, msgEmail) &&
    validateInputs(addressInput, msgAddress)
  ) {
    let contact = {
      name: fullNameInput.value,
      phoneNumber: phoneInput.value,
      email: emailInput.value,
      contactAddress: addressInput.value,
      contactGroup: groupInput.value,
      contactNotes: notesInput.innerHTML,
      isFavouriteContact: isFavouriteInput.checked,
      isEmergencyContact: isEmergencyInput.checked,
      contactImage: contactImageInput.files[0]
        ? `images/${contactImageInput.files[0].name}`
        : "images/{}.jpg",
    };

    var existingContact = contactList.find(c => c.phoneNumber === contact.phoneNumber)
    if (index === -1) {
      if(!existingContact)
      {
        contactList.push(contact);
        Swal.fire({
          icon:"success",
          title: "Added!",
          text: "Contact has been added successfully.",
          showConfirmButton: false,
          timer: 800
        });
        cancelButton.click();
        DisplayContacts();
    clearInputs();
      }
      else {
        Swal.fire({
          title: "Duplicate Phone Number!",
          text: `A contact with this phone number already exists: ${existingContact.name}`,
          icon: "error"
        });
      }
    } 
    else {
      if(!existingContact || existingContact.phoneNumber === contact.phoneNumber)
      {
        contact.contactImage === "images/{}.jpg"? `${contact.contactImage=existingContact.contactImage}`:`${contact.contactImage=contact.contactImage}`;
      contactList.splice(index, 1, contact);
      Swal.fire({
        icon:"success",
        title: "Updated!",
        text: "Contact has been updated successfully.",
        showConfirmButton: false,
        timer: 800
      });
      cancelButton.click();
      DisplayContacts();
    clearInputs();
    }
    else {
      Swal.fire({
          title: "Duplicate Phone Number!",
          text: `A contact with this phone number already exists: ${existingContact.name}`,
          icon: "error"
        });
    }
    }
    localStorage.setItem("contactContainer", JSON.stringify(contactList));
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
                  inputsModalLabel.innerHTML = "Add New Contact";
  } else {
    saveButtonDiv.innerHTML = `<button
                    id="saveButton"
                    class="w-100 fw-semibold text-light rounded-3" onclick="addOrUpdate(${index})"
                  >
                    <i class="fa-solid fa-check"></i> Save Contact
                  </button>`;

                  inputsModalLabel.innerHTML = "Edit Contact";
                  fillInputsForEdit(index);
  }
}

function fillInputsForEdit(index){
  fullNameInput.value = contactList[index].name;
  phoneInput.value = contactList[index].phoneNumber;
  emailInput.value = contactList[index].email;
  addressInput.value = contactList[index].contactAddress;
  groupInput.value = contactList[index].contactGroup;
  notesInput.innerHTML = contactList[index].contactNotes;
  isFavouriteInput.checked = contactList[index].isFavouriteContact;
  isEmergencyInput.checked = contactList[index].isEmergencyContact;
  contactImagePreviewFallbackInput.innerHTML = `${contactList[index].name.slice(0,2).toUpperCase()}`;
  if(contactList[index].contactImage !== "images/{}.jpg")
    {
      contactImagePreview.setAttribute("src",`${contactList[index].contactImage}`);
      contactImagePreview.classList.remove("d-none");
      contactImagePreviewFallbackInput.classList.add("d-none");
    }
    else {
      contactImagePreview.setAttribute("src", "");
      contactImagePreview.classList.add("d-none");
      contactImagePreviewFallbackInput.classList.remove("d-none");
    }
}

function DisplayContacts() {
  var text = searchbarInput.value;
  DisplayTotalList(text);
  DisplayFavouriteList(text);
  DisplayEmergencyList(text);
}

function updateImage(element) {
  if (element.files[0]) {
    const imagePath = `images/${element.files[0].name}`;
    
    const testImg = new Image();
    
    testImg.onload = function () {
      contactImagePreview.setAttribute("src", imagePath);
      contactImagePreview.classList.remove("d-none");
      contactImagePreviewFallbackInput.classList.add("d-none");
    };
    
    testImg.onerror = function () {
      contactImagePreview.setAttribute("src", "");
      contactImagePreview.classList.add("d-none");
      contactImagePreviewFallbackInput.classList.remove("d-none");
    };

    testImg.src = imagePath;
  } 
  else {
    contactImagePreview.setAttribute("src", "");
    contactImagePreview.classList.add("d-none");
    contactImagePreviewFallbackInput.classList.remove("d-none");
  }
}


function DisplayTotalList(text) {
  var htmlPlaceholder = "";
  totalContactsHeaderLabel.innerHTML = contactList.length;
  summaryTotalContactsLabel.innerHTML = contactList.length;
  if (contactList.length > 0) {
    noContactsDiv.classList.add("d-none");
  }
  else {
    noContactsDiv.classList.remove("d-none");
  }
  for (let i = 0; i < contactList.length; i++) {
    if(contactList[i].name.toLowerCase().includes(text.toLowerCase()) ||
       contactList[i].email.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].phoneNumber.toString().includes(text))
    {
      htmlPlaceholder += `
          <div class="col-md-6">
                      <div class="contact">
                        <div
                          class="card my-contact-card bg-white shadow-sm rounded-4 d-flex flex-column"
                        >
                          <div class="card-content p-4 flex-grow-1">
                            <div
                              class="header d-flex justify-content-start align-items-center gap-3 pb-3"
                            >
                              <div class="contactImagePlaceholder ${generateBackground(contactList[i].name)} rounded-3 position-relative d-flex justify-content-center align-items-center ${generateBackground(contactList[i].name)}">
                                ${contactList[i].contactImage !== "images/{}.jpg"
                                  ? `<img src="${contactList[i].contactImage}" class="contactImage w-100 h-100 object-fit-cover d-block rounded-3" alt="Contact Image"/>`
                                  : `<span class="contactImageLetter fw-semibold text-light">${contactList[i].name.slice(0, 2).toUpperCase()}</span>`
                                }
                                ${contactList[i].isFavouriteContact
                                  ? `<span class="favouritedContact d-flex justify-content-center align-items-center rounded-circle bg-warning position-absolute border-white">
                                      <i class="fa-solid fa-star text-white"></i>
                                    </span>`
                                  : ``
                                }
                                ${contactList[i].isEmergencyContact
                                  ? `<span class="emergencyContact d-flex justify-content-center align-items-center rounded-circle bg-danger position-absolute border-white">
                                      <i class="fa-solid fa-heart-pulse text-white"></i>
                                    </span>`
                                  : ``
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
                              contactList[i].email !== ""
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
                              contactList[i].contactAddress !== ""
                                ? `<div
                              class="addressDiv d-flex justify-content-start align-items-center gap-3 pb-3"
                            >
                              <span
                                class="icon rounded-2 d-flex justify-content-center align-items-center"
                                ><i class="fa-solid fa-location-pin"></i></span>
                              <span class="contactAddress fw-normal text-muted"
                                >${contactList[i].contactAddress}</span
                              >
                            </div>`
                                : ``
                            }
                            <div
                              class="contact-tags d-flex justify-content-start align-items-center gap-2"
                            >
                              <span class="groupTag px-2 py-1 ${contactList[i].contactGroup}-tag text-capitalize rounded-3"
                                >${contactList[i].contactGroup}</span
                              >
                              ${
                                contactList[i].isEmergencyContact
                                  ? `<span class="px-2 py-1 rounded-3 emergencyTag"
                                ><i class="fa-solid fa-heart-pulse"></i>
                                Emergency</span
                              >`
                                  : ``
                              }
                            </div>
                          </div>
                          <div class="card-footer my-card-footer px-4 flex-shrink-0">
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
                              ${contactList[i].isFavouriteContact? `<button
                                  class="favouriteButton d-flex justify-content-center align-items-center isfavourite rounded-3" onclick="toggleFavourite(${i},this)"
                                >
                                  <i class="fa-solid fa-star"></i>
                                </button>`:`<button onclick="toggleFavourite(${i},this)"
                                  class="favouriteButton d-flex justify-content-center align-items-center notfavourite rounded-3"
                                >
                                  <i class="fa-regular fa-star"></i>
                                </button>`}
                                ${contactList[i].isEmergencyContact? `<button onclick="toggleEmergency(${i},this)"
                                  class="emergencyButton d-flex justify-content-center align-items-center isemergency rounded-3"
                                >
                                  <i class="fa-solid fa-heart-pulse"></i>
                                </button>`:`<button onclick="toggleEmergency(${i},this)"
                                  class="emergencyButton d-flex justify-content-center align-items-center notemergency rounded-3"
                                >
                                  <i class="fa-regular fa-heart"></i>
                                </button>`}
                                
                                <button onclick="setAddOrUpdate(${i})" data-bs-toggle="modal" data-bs-target="#inputsModal"
                                  class="editButton d-flex justify-content-center align-items-center rounded-3"
                                >
                                  <i class="fa-solid fa-pen"></i>
                                </button>
                                <button onclick="deleteContact(${i})"
                                  class="deleteButton d-flex justify-content-center align-items-center rounded-3"
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
    }
  }
  contactListHTML.innerHTML = htmlPlaceholder;
}

function deleteContact(index) {
  Swal.fire({
  title: "Delete Contact?",
  text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#6b7280",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
    contactList.splice(index,1);
  localStorage.setItem("contactContainer",JSON.stringify(contactList));
  DisplayContacts();
  Swal.fire({
    title: "Deleted!",
    text: "Contact has been deleted.",
    icon: "success",
    showConfirmButton: false,
        timer: 800
  });
} 
});
  
}

function DisplayFavouriteList(text) {
  var favouriteCounter = 0;
var htmlPlaceholder = "";

  for(let i = 0; i < contactList.length; i++)
  {
    if(contactList[i].isFavouriteContact)
    {
      favouriteCounter++;
      if(contactList[i].name.toLowerCase().includes(text.toLowerCase()) ||
       contactList[i].email.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].phoneNumber.toString().includes(text))
    {
        htmlPlaceholder += `
                                      <div class="col-12 col-md-6 col-xl-12">
                                  <a
                                    href="tel:${contactList[i].phoneNumber}"
                                    class="contact rounded-3 p-2 w-100 text-decoration-none d-block d-flex justify-content-between align-items-center"
                                  >
                                    <div
                                      class="lside d-flex justify-content-start align-items-center gap-2"
                                    >
                                      <div
                                        class="contactImagePlaceholder ${generateBackground(contactList[i].name)} rounded-3 position-relative d-flex justify-content-center align-items-center"
                                      >
                                      ${contactList[i].contactImage !== "images/{}.jpg"? `<img
                                          src="${contactList[i].contactImage}"
                                          class="contactImage w-100 h-100 object-fit-cover d-block rounded-3"
                                          alt="${contactList[i].name} image"
                                        />`:`<span
                                          class="contactImageLetter d-none fw-semibold"
                                          >${contactList[i].name.slice(0, 2).toUpperCase()}</span>`}
                                        
                                        
                                      </div>
                                      <div
                                        class="contact-info d-flex flex-column align-items-start justify-content-center g-2"
                                      >
                                        <h4
                                          class="contactName fw-medium text-black m-0"
                                        >
                                          ${contactList[i].name}
                                        </h4>
                                        <span
                                          class="contactNumber text-muted fw-normal"
                                          >${contactList[i].phoneNumber}</span
                                        >
                                      </div>
                                    </div>
                                    <span
                                      class="icon d-flex justify-content-center align-items-center rounded-3"
                                      ><i class="fa-solid fa-phone"></i
                                    ></span>
                                  </a>
                                </div>
        `;
      }
      
    }
  }
  favouriteListHTML.innerHTML = htmlPlaceholder;
  summaryTotalFavouritesContactsLabel.innerHTML = favouriteCounter;
  if (favouriteCounter > 0) {
    noFavouritesDiv.classList.add("d-none");
  }
  else {
    noFavouritesDiv.classList.remove("d-none");
  }
}
function DisplayEmergencyList(text) {
  var emergencyCounter = 0;
  var htmlPlaceholder = "";
  for(let i = 0; i < contactList.length; i++)
  {
    if(contactList[i].isEmergencyContact)
    {
      emergencyCounter++;
      if(contactList[i].name.toLowerCase().includes(text.toLowerCase()) ||
       contactList[i].email.toLowerCase().includes(text.toLowerCase()) ||
      contactList[i].phoneNumber.toString().includes(text))
    {
        htmlPlaceholder += `
                      <div class="col-12 col-md-6 col-xl-12">
                                  <a
                                    href="tel:${contactList[i].phoneNumber}"
                                    class="contact rounded-3 p-2 w-100 text-decoration-none d-block d-flex justify-content-between align-items-center"
                                  >
                                    <div
                                      class="lside d-flex justify-content-start align-items-center gap-2"
                                    >
                                      <div
                                        class="contactImagePlaceholder ${generateBackground(contactList[i].name)} rounded-3 position-relative d-flex justify-content-center align-items-center"
                                      >
                                      ${contactList[i].contactImage !== "images/{}.jpg"? `<img
                                          src="${contactList[i].contactImage}"
                                          class="contactImage w-100 h-100 object-fit-cover d-block rounded-3"
                                          alt="${contactList[i].name} image"
                                        />`:`<span
                                          class="contactImageLetter d-none fw-semibold"
                                          >${contactList[i].name.slice(0, 2).toUpperCase()}</span>`}
                                      </div>
                                      <div
                                        class="contact-info d-flex flex-column align-items-start justify-content-center g-2"
                                      >
                                        <h4
                                          class="contactName fw-medium text-black m-0"
                                        >
                                          ${contactList[i].name}
                                        </h4>
                                        <span
                                          class="contactNumber text-muted fw-normal"
                                          >${contactList[i].phoneNumber}</span
                                        >
                                      </div>
                                    </div>
                                    <span
                                      class="icon d-flex justify-content-center align-items-center rounded-3"
                                      ><i class="fa-solid fa-phone"></i
                                    ></span>
                                  </a>
                                </div>                
        `;
      }
    }
  }
  emergencyListHTML.innerHTML = htmlPlaceholder;
  summaryTotalEmergencyContactsLabel.innerHTML = emergencyCounter;
  if (emergencyCounter > 0) {
    noEmergencyDiv.classList.add("d-none");
  }
  else {
    noEmergencyDiv.classList.remove("d-none");
  }
}
function toggleFavourite(index,element) {

contactList[index].isFavouriteContact = !contactList[index].isFavouriteContact;
if(contactList[index].isFavouriteContact){
  element.classList.add("isfavourite");
  element.classList.remove("notfavourite");
  element.innerHTML = '<i class="fa-solid fa-star"></i>' ;
}
else {
  element.classList.remove("isfavourite");
  element.classList.add("notfavourite");
  element.innerHTML = '<i class="fa-regular fa-star"></i>' ;
}
localStorage.setItem("contactContainer", JSON.stringify(contactList));
DisplayContacts();
}
function toggleEmergency(index,element) {
contactList[index].isEmergencyContact = !contactList[index].isEmergencyContact;
if(contactList[index].isEmergencyContact){
  element.classList.add("isemergency");
  element.classList.remove("notemergency");
  element.innerHTML = '<i class="fa-solid fa-heart-pulse"></i>' ;
}
else {
  element.classList.remove("isemergency");
  element.classList.add("notemergency");
  element.innerHTML = '<i class="fa-regular fa-heart"></i>' ;
}
localStorage.setItem("contactContainer", JSON.stringify(contactList));
DisplayContacts();
}
function clearInputs() {
  contactImageInput.value = "";
  fullNameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  addressInput.value = "";
  groupInput.selectedIndex = 0;
  notesInput.innerHTML = "";
  isFavouriteInput.checked = false;
  isEmergencyInput.checked = false;
  contactImagePreview.setAttribute("src", "");
  contactImagePreview.classList.add("d-none");
  contactImagePreviewFallbackInput.classList.remove("d-none");

  fullNameInput.classList.remove("is-valid");
  phoneInput.classList.remove("is-valid");
  emailInput.classList.remove("is-valid");
  addressInput.classList.remove("is-valid");
  fullNameInput.classList.remove("is-invalid");
  phoneInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  addressInput.classList.remove("is-invalid");

}
function generateBackground(name) {
  return imagePlaceholderClasses[name.length % imagePlaceholderClasses.length];
}
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
