import { db, storage } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const form = document.getElementById("itemForm");
const itemsDiv = document.getElementById("items");

/* ================= SUBMIT FORM ================= */
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Explicitly select your input elements
    const imageInput = document.getElementById("image");
    const nameInput = document.getElementById("name");
    const categoryInput = document.getElementById("category");
    const statusInput = document.getElementById("status");
    const locationInput = document.getElementById("location");
    const descInput = document.getElementById("description");
    const emailInput = document.getElementById("email");

    // 2. Access the file and create a storage reference
    const file = imageInput.files[0];
    if (!file) return alert("Please upload an image!");

    const imageRef = ref(storage, `items/${Date.now()}-${file.name}`);

    try {
      // 3. Perform the upload
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);

      // 4. Add data to Firestore using the input values
      await addDoc(collection(db, "items"), {
        name: nameInput.value,
        category: categoryInput.value,
        status: statusInput.value,
        location: locationInput.value,
        description: descInput.value,
        email: emailInput.value,
        imageURL,
        createdAt: new Date()
      });

      alert("Item Reported Successfully!");
      form.reset();
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Failed to submit. Check console for details.");
    }
  });
}

/* ================= DISPLAY ITEMS ================= */
async function loadItems() {
  const querySnapshot = await getDocs(collection(db, "items"));
  itemsDiv.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const d = doc.data();
    // Using backticks for template literals to build the HTML
    itemsDiv.innerHTML += `
      <div class="card">
        <img src="${d.imageURL}" alt="${d.name}">
        <h3>${d.name}</h3>
        <p><strong>Status:</strong> ${d.status}</p>
        <p><strong>Location:</strong> ${d.location}</p>
        <p><strong>Contact:</strong> ${d.email}</p>
      </div>
    `;
  });
}

if (itemsDiv) {
  loadItems();
}