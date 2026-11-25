(() => {
  const counter = document.getElementById("view-counter");
  const endpoint = window.SMA_CONFIG && window.SMA_CONFIG.jplProxyUrl;
  if (!counter || !endpoint) return;

  fetch(endpoint + "?action=views", { method: "GET", cache: "no-store" })
    .then(response => {
      if (!response.ok) throw new Error("Counter request failed");
      return response.json();
    })
    .then(data => {
      if (!Number.isFinite(Number(data.views))) throw new Error("Invalid counter response");
      const count = new Intl.NumberFormat("en").format(Number(data.views));
      counter.textContent = "👁️ " + count;
      counter.title = "Total SPACEMESHER page views";
      counter.setAttribute("aria-label", count + " total page views");
    })
    .catch(() => {
      counter.textContent = "👁️";
      counter.title = "Page view count temporarily unavailable";
      counter.setAttribute("aria-label", "Page view count unavailable");
    });
})();
