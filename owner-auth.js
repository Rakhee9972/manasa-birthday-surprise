
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginButton = document.getElementById("ownerLoginButton");

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("ownerEmail").value.trim();
    const password = document.getElementById("ownerPassword").value;
    const status = document.getElementById("ownerStatus");

    status.textContent = "Signing in...";
    loginButton.disabled = true;

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (credential.user.email !== "rakhee201505@gmail.com") {
        await signOut(auth);
        throw new Error("This account is not authorized as the owner.");
      }

      status.textContent = "Owner login successful! ❤️";
      const dashboard = document.getElementById("ownerDashboard");

if (dashboard) {
  dashboard.style.display = "block";
dashboard.hidden = false;
  dashboard.scrollIntoView({ behavior: "smooth" });
        }
    } catch (error) {
      status.textContent = "Login failed: " + error.message;
    } finally {
      loginButton.disabled = false;
    }
  });
}
