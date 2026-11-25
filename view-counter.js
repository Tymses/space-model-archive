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
      counter.innerHTML = '<svg class="view-eye-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><span class="view-count"></span>';
      counter.querySelector(".view-count").textContent = count;
      counter.title = "Total SPACEMESHER page views";
      counter.setAttribute("aria-label", count + " total page views");
    })
    .catch(() => {
      counter.innerHTML = '<svg class="view-eye-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><span class="view-count"></span>';
      counter.title = "Page view count temporarily unavailable";
      counter.setAttribute("aria-label", "Page view count unavailable");
    });
})();
