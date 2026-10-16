import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const loginButton = document.getElementById("ownerLoginButton");

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("ownerEmail").value.trim();
    const password = document.getElementById("ownerPassword").value;
    const status = document.getElementById("ownerStatus");

    status.textContent = "Signing in…";
    loginButton.disabled = true;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      status.textContent = "Login successful. Checking owner permissions…";
    } catch (error) {
      status.textContent = "Login failed. Please check your email and password.";
    } finally {
      loginButton.disabled = false;
    }
  });
}
