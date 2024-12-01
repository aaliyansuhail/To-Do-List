var data = [];
var boxDiv = document.getElementsByClassName("box")[0];

function submitInput(e) {
  e.preventDefault();
  var inp = document.getElementById("input-text");

  // Add new item with completed flag set to false by default
  data.push({ text: inp.value, completed: false });
  dataRender();

  // Clear input field
  inp.value = "";

  // Save the updated data to localStorage
  localStorage.setItem("data", JSON.stringify(data));
}

function dataRender() {
  // Clear the boxDiv only once at the beginning
  boxDiv.innerHTML = "";

  // Render each item
  for (let i = 0; i < data.length; i++) {
    // Render completed tasks but style them differently (green color)
    boxDiv.innerHTML += `<div class='list-item'>
      <p id="item-${i}" style="color: ${data[i].completed ? 'green' : 'black'};">
        ${data[i].text}
      </p>
      <input type='text' value='${data[i].text}' class='inpEdit'/>
      ${!data[i].completed ? `<button onClick="editItem(event)">edit</button>
      <button onClick="deleteItem(event)">delete</button>
      <button onClick="complete(event)">done</button>` : `<button onClick="deleteItem(event)">delete</button>`}
    </div>`;
  }
}

function deleteItem(e) {
  const parentDiv = e.target.parentNode;
  const pTag = parentDiv.getElementsByTagName('p')[0];
  const index = parseInt(pTag.id.split('-')[1]); // Get the index from the id

  // Remove the item from the data array
  data.splice(index, 1);

  // Re-render the list with the updated state
  dataRender();

  // Save the updated data to localStorage
  localStorage.setItem("data", JSON.stringify(data));
}

function saveEdit(id, updateValue) {
  data[id] = {
    ...data[id],
    text: updateValue,
  };
  dataRender();
  localStorage.setItem("data", JSON.stringify(data));
}

function editItem(e) {
  if (e.target.innerText === "save") {
    const id = e.target.parentNode.getElementsByTagName('p')[0].id.split('-')[1];
    saveEdit(id, e.target.previousElementSibling.value);
    e.target.innerText = "edit";
  }

  e.target.previousElementSibling.style.display = "block";
  e.target.previousElementSibling.previousElementSibling.style.display = "none";
  e.target.nextElementSibling.style.display = "none";
  e.target.nextElementSibling.nextElementSibling.style.display = "none";
  e.target.innerText = "save";
}

function complete(e) {
  // Get the parent div of the clicked "done" button
  const parentDiv = e.target.parentNode;

  // Get the <p> element which contains the text
  const text = parentDiv.getElementsByTagName('p')[0];

  // Change the text color to green
  text.style.color = 'green';

  // Hide the "edit", "delete", and "done" buttons
  e.target.previousElementSibling.previousElementSibling.style.display = "none"; // Hide the "edit" button
  e.target.previousElementSibling.style.display = "none"; // Hide the "delete" button
  e.target.style.display = "none"; // Hide the "done" button

  // Get the index of the current item
  const index = parseInt(text.id.split('-')[1]);

  // Mark the item as completed in the data array
  data[index].completed = true;

  // Save the updated data array to localStorage
  localStorage.setItem("data", JSON.stringify(data));

  // Re-render the list with the updated state
  dataRender();
}

function loadData() {
  // Retrieve the data from localStorage (if available)
  const savedData = localStorage.getItem("data");

  if (savedData) {
    data = JSON.parse(savedData);
  }

  // Re-render the list based on the loaded data
  dataRender();
}

// Call loadData when the page loads
window.onload = loadData;








