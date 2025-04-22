// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkH9bD2OWaI08cJVsdRNVU_XavoUTwIUA",
  authDomain: "shire-rats.firebaseapp.com",
  projectId: "shire-rats",
  storageBucket: "shire-rats.appspot.com",
  messagingSenderId: "541361661882",
  appId: "1:541361661882:web:8876816bc3cb591eb99f83"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const list = document.getElementById("messageList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    await db.collection("messages").add({
      text,
      timestamp: Date.now()
    });
    input.value = "";
  }
});

// Load and display messages (newest first)
db.collection("messages")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      li.className = "message";
      list.appendChild(li);
    });
  });
