/* Apply saved theme before first paint to avoid a light/dark flash.
   Loaded synchronously in <head>; kept external so CSP can forbid inline scripts. */
(function () {
  // Lets CSS hide content for entrance animations only when JS is running,
  // so the page stays readable with JavaScript disabled.
  document.documentElement.classList.add("js");
  try {
    var t =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
