<script>
function showShortLink(link) {
  document.getElementById("resultBox").style.display = "block";
  document.getElementById("shortLink").value = link;
}

function copyLink() {
  const copyText = document.getElementById("shortLink");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);

  alert("Link copied successfully!");
}
</script>
