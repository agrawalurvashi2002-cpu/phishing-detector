function analyzeURL() {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.innerHTML = "⚠️ Please enter a valid URL.";
    return;
  }

  let reasons = [];

  if (url.includes("@")) {
    reasons.push("Contains '@' symbol (used to redirect)");
  }

  if (url.length > 75) {
    reasons.push("URL is unusually long");
  }

  const suspiciousKeywords = ["login", "secure", "update", "verify", "bank", "paypal"];
  suspiciousKeywords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      reasons.push(`Contains suspicious word: "${word}"`);
    }
  });

  const ipPattern = /^(http:\/\/|https:\/\/)?\d{1,3}(\.\d{1,3}){3}/;
  if (ipPattern.test(url)) {
    reasons.push("Uses IP address instead of domain");
  }

  if (reasons.length === 0) {
    resultDiv.innerHTML = `✅ Safe: No common phishing patterns detected.`;
    resultDiv.style.color = "#00e676";
  } else {
    resultDiv.innerHTML = `⚠️ Suspicious URL<br><ul>${reasons.map(r => `<li>${r}</li>`).join("")}</ul>`;
    resultDiv.style.color = "#ff3e3e";
  }
}
