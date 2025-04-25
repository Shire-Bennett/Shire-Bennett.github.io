// 1. Firebase Config + Init
const firebaseConfig = {
  apiKey: "AIzaSyDkH9bD2OWaI08cJVsdRNVU_XavoUTwIUA",
  authDomain: "shire-rats.firebaseapp.com",
  projectId: "shire-rats",
  storageBucket: "shire-rats.appspot.com",
  messagingSenderId: "541361661882",
  appId: "1:541361661882:web:8876816bc3cb591eb99f83"
};
const authForm = document.getElementById("authForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

authForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  const userRef = doc(db, "users", username);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Sign Up
    await setDoc(userRef, { password });
    alert("Account created! You are now logged in.");
    unlockSite();
  } else {
    // Login
    if (userSnap.data().password === password) {
      alert("Welcome back!");
      unlockSite();
    } else {
      alert("Incorrect password.");
    }
  }
});

function unlockSite() {
  document.querySelector(".container").style.display = "block";
  document.querySelector(".auth-container").style.display = "none";
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. Message submission
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

// 3. Real-time message listener
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

// 4. Clear messages logic
const clearBtn = document.getElementById("clearMessagesBtn");

clearBtn.addEventListener("click", async () => {
  if (confirm("Are you sure you want to clear all messages?")) {
    const snapshot = await db.collection("messages").get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  }
});
