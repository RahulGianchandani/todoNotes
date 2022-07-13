let titleInput = document.getElementById("addTitle"); //addTitle input field
let textArea = document.getElementById("addTxt"); //textArea input field
let addBtn = document.getElementById("addBtn"); // Add Note button

//creating mainDiv
let mainDiv = document.getElementById("notes");

//getting data

createNote();

addBtn.addEventListener("click", (e) => {
  // adding note Title

  if (!titleInput.value || !textArea.value) {
    alert("fill field");
    return false;
  }

  cardObj = {
    title: titleInput.value,
    note: textArea.value,
  };

  // adding notes test <p>
  let notes = localStorage.getItem("notes"); //again getting stringified as array
  // console.log(textArea.value);

  notes == null ? (notesArr = []) : (notesArr = JSON.parse(notes));

  notesArr.push(cardObj);
  console.log(notesArr);

  localStorage.setItem("notes", JSON.stringify(notesArr)); //saving Arrect array as string
  titleInput.value = "";
  textArea.value = "";

  createNote();
  // console.log(notes);
});

function createNote() {
  //notes

  setTimeout(() => {
    let indexes = localStorage.getItem("index");

    let notes = localStorage.getItem("notes");
    console.log(notes);
    notes == null ? (notesArr = []) : (notesArr = JSON.parse(notes));

    console.log(notes);
    console.log(notesArr);
    let html = "";
    if (notes?.length > 0) {
      notesArr.forEach(function (element, index) {
        html += `
                <div id="${index}" class="noteCard my-2 mx-2 card border-success ${
          indexes?.includes(index)
            ? JSON.parse(localStorage.getItem("classList"))
            : ""
        }" 
          style="width: 18rem;" ondblclick="markImp(this.id)">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                            <h5 class="card-title" onblur="saveEdit()">${
                              element.title
                            }</h5>
                            <button type="button" id="${index}"   class="btn btn-primary" onclick="updateNote(this.id)" >Edit</button>
                            </div>
                            <p class="card-text" onblur="saveEdit()"> ${
                              element.note
                            }</p>
                            <button id="${index}"onclick="deleteNote(this.id)"  class="btn btn-danger deleteBtn">Delete Note</button>
                        </div>
                    </div>`;
      });
    }

    let noNotes = document.createElement("label");
    noNotes.innerText = "No notes added to show. Add?";
    noNotes.className = "btn-danger btn btn-lg btn-block ";
    noNotes.setAttribute("for", "addTitle");

    notesArr == 0 ? mainDiv.appendChild(noNotes) : (mainDiv.innerHTML = html);

    console.log("Delayed for 1 second.");
  }, "5");
}

// Search Filtering

let searchBtn = document.getElementById("searchBtn");
let searchField = document.getElementById("searchInput");
let cards = document.getElementsByClassName("noteCard");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cards = [...cards]; //converting cards html collection to an Array

  cards.forEach((element, index) => {
    let cardTxt = document.getElementsByClassName("card-text")[index].innerHTML;

    console.log(cardTxt.toLowerCase());
    cardTxt.includes(
      searchField.value.toLowerCase() || searchField.value.toUpperCase()
    )
      ? (element.style.display = "block")
      : (element.style.display = "none");
  });
});

// Deleting

const deleteNote = (index) => {
  impCards = cards[index].classList.contains("important");

  let notes = localStorage.getItem("notes");
  console.log(notes);
  notes == null ? (notesArr = []) : (notesArr = JSON.parse(notes));
  console.log(cards);
  notesArr.splice(index, 1);
  console.log(notesArr);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  createNote();
};

// Update / edit textNote
const updateNote = (index) => {
  let cardTitle = document.getElementsByTagName("h5")[index];
  let cardTxt = document.getElementsByClassName("card-text")[index];
  cardTitle.classList.add(
    "shadow-lg",
    "p-2",
    "my-2",
    "bg-white",
    "rounded",
    "border"
  );
  cardTxt.classList.add(
    "shadow-lg",
    "p-2",
    "my-2",
    "bg-white",
    "rounded",
    "border"
  );

  let notes = localStorage.getItem("notes");
  notes == null ? (notesArr = []) : (notesArr = JSON.parse(notes));
  cardTxt.setAttribute("contenteditable", true);
  cardTitle.setAttribute("contenteditable", true);

  console.log(cardTxt.textContent);
  console.log(cardTitle.textContent);

  // adding blur event to edit
  saveEdit = () => {
    notesArr[index].note = cardTxt.textContent;
    notesArr[index].title = cardTitle.textContent;

    console.log(notesArr);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    alert("Editing done!");
  };
};

// Mark important

const markImp = (index) => {
  cards[index].classList.toggle("important");
  console.log(index);
  localStorage.setItem(
    "classList",
    JSON.stringify(cards[index].classList.value)
  );

  //   save index of current card so we can retrieve important class only on those cards in UI

  let indexes = localStorage.getItem("index");
  console.log(indexes);

  indexes == null ? (indexArr = []) : (indexArr = JSON.parse(indexes));
  indexArr.includes(index)
    ? (indexArr = indexArr.filter((element) => {
        return element !== index;
      }))
    : indexArr.push(index);

  // indexArr.includes(index) ? indexArr.splice(index,1) : indexArr.push(index)

  localStorage.setItem("index", JSON.stringify(indexArr));
};
