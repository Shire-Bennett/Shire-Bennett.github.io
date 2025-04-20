const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');
const list = document.getElementById('messageList');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const message = input.value.trim();
  if (message !== '') {
    const li = document.createElement('li');
    li.textContent = message;
    list.prepend(li);
    input.value = '';
  }
});
