async function shortenUrl(){

const original=document.getElementById("original").value;
const custom=document.getElementById("custom").value;

const result=document.getElementById("result");

const res=await fetch("/shorten",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
original,
custom
})
});

const data=await res.json();

result.innerHTML=`<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;

}
function shortenUrl() {
  // your existing code...

  document.getElementById("result").innerText = shortLink;

  document.getElementById("copyBtn").style.display = "block";
}
