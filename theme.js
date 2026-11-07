(function () {
  var KEY = "pg_theme";
  var ORDER = ["night", "paper", "noir", "lime"];
  var THEMES = {
    night: {
      id: "night",
      label: "紫 × 金",
      vars: {
        "--bg": "#0c0610",
        "--bg-2": "#1a0b18",
        "--surface": "rgba(28, 14, 32, 0.88)",
        "--gold": "#f3c14a",
        "--gold-2": "#ffe9a3",
        "--red": "#e23d4a",
        "--ink": "#fff7ea",
        "--muted": "#c9b8a4",
        "--king": "#9b6bff",
        "--joker": "#3dd6c6",
        "--shadow": "0 18px 50px rgba(0, 0, 0, 0.45)",
        "--glow-1": "#3a1533",
        "--glow-2": "#1d2a4a",
        "--line": "rgba(243,193,74,0.28)",
        "--on-accent": "#2a1608",
        "--chip": "rgba(255,255,255,0.08)",
        "--dot-border": "rgba(255,247,234,0.7)",
        "--dot-empty": "rgba(255,255,255,0.08)"
      }
    },
    paper: {
      id: "paper",
      label: "白 × 赤",
      vars: {
        "--bg": "#f7f4ef",
        "--bg-2": "#efe8e0",
        "--surface": "#ffffff",
        "--gold": "#c41e3a",
        "--gold-2": "#e85a6b",
        "--red": "#c41e3a",
        "--ink": "#1b1110",
        "--muted": "#6b5b57",
        "--king": "#8b3a9e",
        "--joker": "#1a9b8a",
        "--shadow": "0 18px 50px rgba(80, 40, 40, 0.12)",
        "--glow-1": "#f3d8d4",
        "--glow-2": "#e8e0d4",
        "--line": "rgba(196,30,58,0.28)",
        "--on-accent": "#fff7f7",
        "--chip": "rgba(0,0,0,0.06)",
        "--dot-border": "#1b1110",
        "--dot-empty": "rgba(27,17,16,0.12)"
      }
    },
    noir: {
      id: "noir",
      label: "黒 × ピンク",
      vars: {
        "--bg": "#0e0c0d",
        "--bg-2": "#161214",
        "--surface": "#1a1418",
        "--gold": "#ff4d8d",
        "--gold-2": "#ff9ec0",
        "--red": "#ff4d8d",
        "--ink": "#fff0f5",
        "--muted": "#c9a8b4",
        "--king": "#c77dff",
        "--joker": "#3dd6c6",
        "--shadow": "0 18px 50px rgba(0, 0, 0, 0.5)",
        "--glow-1": "#3a1528",
        "--glow-2": "#1a1020",
        "--line": "rgba(255,77,141,0.4)",
        "--on-accent": "#1a0a10",
        "--chip": "rgba(255,255,255,0.08)",
        "--dot-border": "rgba(255,240,245,0.7)",
        "--dot-empty": "rgba(255,255,255,0.08)"
      }
    },
    lime: {
      id: "lime",
      label: "黄緑 × グレー",
      vars: {
        "--bg": "#dce8c8",
        "--bg-2": "#cfd9bb",
        "--surface": "#f4f7ee",
        "--gold": "#5a5a5a",
        "--gold-2": "#7a7a7a",
        "--red": "#c41e3a",
        "--ink": "#1c1c1c",
        "--muted": "#5c6154",
        "--king": "#6b7c3a",
        "--joker": "#3a8a7a",
        "--shadow": "0 18px 40px rgba(60, 70, 40, 0.12)",
        "--glow-1": "#c8d4a8",
        "--glow-2": "#d8e0cc",
        "--line": "#7a7a7a",
        "--on-accent": "#f4f7ee",
        "--chip": "rgba(0,0,0,0.06)",
        "--dot-border": "#1c1c1c",
        "--dot-empty": "rgba(28,28,28,0.12)"
      }
    }
  };

  function current() {
    try {
      var id = localStorage.getItem(KEY);
      return THEMES[id] ? id : "night";
    } catch (e) {
      return "night";
    }
  }

  function apply(id) {
    var t = THEMES[id] || THEMES.night;
    var root = document.documentElement;
    root.setAttribute("data-theme", t.id);
    Object.keys(t.vars).forEach(function (key) {
      root.style.setProperty(key, t.vars[key]);
    });
    try {
      localStorage.setItem(KEY, t.id);
    } catch (e) {}
  }

  function renderSettings(el) {
    if (!el) return;
    el.innerHTML = "";
    var selected = current();
    ORDER.forEach(function (id) {
      var t = THEMES[id];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-pick" + (selected === id ? " on" : "");
      btn.setAttribute("aria-pressed", selected === id ? "true" : "false");
      btn.innerHTML =
        '<span class="swatch" style="background:' +
        t.vars["--bg"] +
        ";border-color:" +
        t.vars["--gold"] +
        '"></span>' +
        t.label;
      btn.addEventListener("click", function () {
        apply(id);
        renderSettings(el);
      });
      el.appendChild(btn);
    });
  }

  window.PGTheme = {
    THEMES: THEMES,
    ORDER: ORDER,
    apply: apply,
    current: current,
    renderSettings: renderSettings
  };

  apply(current());
})();
