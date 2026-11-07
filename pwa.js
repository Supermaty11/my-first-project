(function () {
  function inStandalone() {
    return window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;
  }

  document.addEventListener("click", function (e) {
    if (!inStandalone()) return;
    var a = e.target.closest("a");
    if (!a || a.download) return;
    if (a.target && a.target !== "_self") return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
    var url;
    try {
      url = new URL(a.href, location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== location.origin) return;
    e.preventDefault();
    location.href = url.href;
  }, true);
})();
