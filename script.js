document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const policeForm = document.getElementById('police-form');
  const loginContainer = document.getElementById('login-container');
  const formContainer = document.getElementById('form-container');
  const officerDisplay = document.getElementById('officer-display');
  const preview = document.getElementById('preview');
  const locationInput = document.getElementById('location');
  const timestampInput = document.getElementById('timestamp');

  // Felhasználók, akik beléphetnek
  const officers = [
    { name: Valentin Valentin, badge: 221148, password: ValentinMia1 }
  ];

  // Bejelentkezés kezelése
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(loginForm);
    const name = data.get('officerName');
    const badge = data.get('badge');
    const pass = data.get('password');

    const match = officers.find(o => o.name === name && o.badge === badge && o.password === pass);
    if (match) {
      loginContainer.style.display = 'none';
      formContainer.style.display = 'block';
      officerDisplay.textContent = `${match.name} (${match.badge})`;
    } else {
      alert("Hibás adatok!");
    }
  });

  // GPS koordináták
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      locationInput.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
    });
  }

  timestampInput.value = new Date().toISOString().slice(0, 16);

  // Adatbevitel mentése
  policeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(policeForm);
    let output = '<h3>✅ Mentve (lokálisan):</h3><ul>';
    for (let [key, val] of data.entries()) {
      if (key === "photo" && val.name) {
        output += `<li><strong>Fénykép:</strong> ${val.name}</li>`;
      } else {
        output += `<li><strong>${key}:</strong> ${val}</li>`;
      }
    }
    output += '</ul>';
    preview.innerHTML = output;
    preview.style.display = 'block';

    // Lokális mentés
    localStorage.setItem("last-entry", JSON.stringify(Object.fromEntries(data)));
    policeForm.reset();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
});
