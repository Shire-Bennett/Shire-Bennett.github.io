// Reference to Firestore
const db = firebase.firestore();

// DOM elements
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageList = document.getElementById("messageList");

// Submit form
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    await db.collection("messages").add({
      text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = "";
  }
});

// Real-time listener
db.collection("messages")
  .orderBy("timestamp", "desc") // newest first
  .onSnapshot((snapshot) => {
    messageList.innerHTML = "";
    snapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      li.classList.add("message-box");
      messageList.appendChild(li);
    });
  });
