async function shortenUrl() {

  const original = document.getElementById("original").value;
  const custom = document.getElementById("custom").value;

  const result = document.getElementById("result");

  result.innerHTML = "Creating...";

  const res = await fetch("/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      original,
      custom,
    }),
  });

  const data = await res.json();

  if (data.error) {
    result.innerHTML = `<p>${data.error}</p>`;
  } else {
    result.innerHTML = `
      <p>Short URL:</p>
      <a href="${data.shortUrl}" target="_blank">
        ${data.shortUrl}
      </a>
    `;
  }
}
