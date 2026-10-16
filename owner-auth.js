
import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const OWNER_EMAIL = "rakhee201505@gmail.com";

const loginButton = document.getElementById("ownerLoginButton");
const logoutButton = document.getElementById("ownerLogoutButton");
const dashboard = document.getElementById("ownerDashboard");
const ownerStatus = document.getElementById("ownerStatus");
const feedbackList = document.getElementById("feedbackList");

function showDashboard(show) {
  if (!dashboard) return;
  dashboard.hidden = !show;
  dashboard.style.display = show ? "block" : "none";
}

async function loadFeedback() {
  if (!feedbackList) return;

  feedbackList.textContent = "Loading feedback...";

  try {
    const feedbackQuery = query(
      collection(db, "websiteFeedback"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(feedbackQuery);
    feedbackList.replaceChildren();

    if (snapshot.empty) {
      feedbackList.textContent = "No feedback received yet.";
      return;
    }

    snapshot.forEach((item) => {
      const data = item.data();
      const entry = document.createElement("div");
      entry.style.cssText =
        "padding:12px;margin:10px 0;border:1px solid #d66aa5;border-radius:12px;";

      const rating = document.createElement("p");
      rating.textContent = `Rating: ${data.rating ?? "N/A"}/5`;

      const comment = document.createElement("p");
      comment.textContent = data.comment || "(No comment)";

      const date = document.createElement("p");
      date.textContent = data.createdAt?.toDate
        ? data.createdAt.toDate().toLocaleString()
        : "Date unavailable";

      entry.append(rating, comment, date);
      feedbackList.appendChild(entry);
    });
  } catch (error) {
    console.error(error);
    feedbackList.textContent =
      "Could not load feedback. Please check Firestore Rules.";
  }
}

if (loginButton) {
  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("ownerEmail")?.value.trim();
    const password = document.getElementById("ownerPassword")?.value;

    if (!email || !password) {
      if (ownerStatus) ownerStatus.textContent = "Enter email and password.";
      return;
    }

    loginButton.disabled = true;
    if (ownerStatus) ownerStatus.textContent = "Signing in...";
    showDashboard(false);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (credential.user.email?.toLowerCase() !== OWNER_EMAIL) {
        await signOut(auth);
        throw new Error("This account is not authorized as the owner.");
      }

      if (ownerStatus) {
        ownerStatus.textContent = "Owner login successful! ❤️";
      }

      showDashboard(true);

// Show all birthday messages for the owner
const surprise = document.getElementById("surprise");
const lockMessage = document.getElementById("lockMessage");
const unlock = document.getElementById("unlock");

if (surprise) {
  surprise.style.display = "block";
}

if (lockMessage) {
  lockMessage.style.display = "none";
}

if (unlock) {
  unlock.style.display = "none";
}

if (ownerStatus) {
  ownerStatus.textContent = "Owner login successful! ❤️ All messages are visible.";
}

await loadFeedback();
    } catch (error) {
      if (ownerStatus) {
        ownerStatus.textContent = "Login failed: " + error.message;
      }
      showDashboard(false);
    } finally {
      loginButton.disabled = false;
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showDashboard(false);
      if (ownerStatus) ownerStatus.textContent = "Logged out successfully.";
    } catch (error) {
      if (ownerStatus) ownerStatus.textContent = "Logout failed: " + error.message;
    }
  });
}

const submitFeedbackButton =
  document.getElementById("submitFeedbackButton");

if (submitFeedbackButton) {
  submitFeedbackButton.addEventListener("click", async () => {
    const ratingInput = document.getElementById("rating");
    const commentInput = document.getElementById("feedback");
    const status = document.getElementById("feedbackStatus");
    const rating = Number(ratingInput?.value);
    const comment = commentInput?.value.trim() || "";

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      if (status) status.textContent = "Please select a rating from 1 to 5.";
      return;
    }

    if (!comment || comment.length > 1000) {
      if (status) {
        status.textContent = "Enter a comment (maximum 1000 characters).";
      }
      return;
    }

    submitFeedbackButton.disabled = true;
    if (status) status.textContent = "Saving feedback...";

    try {
      await addDoc(collection(db, "websiteFeedback"), {
        rating,
        comment,
        createdAt: serverTimestamp()
      });

      if (status) status.textContent = "Thank you! Your feedback was saved ❤️";
      commentInput.value = "";
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent =
          "Feedback could not be saved. Please check Firestore Rules.";
      }
    } finally {
      submitFeedbackButton.disabled = false;
    }
  });
}

showDashboard(false);
