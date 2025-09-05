// JS Goes here - ES6 supported
import "./css/main.scss";
import "./modal.js";
import "./performance.js";
import "./accessibility.js";

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
