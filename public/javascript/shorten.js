//import axios

// import axios from 'axios';

// add an event listener to the shorten button for when the user clicks it
document.querySelector('.button-shorten').addEventListener('click', function(){
    // AJAX call to /api/shorten with the URL that the user entered in the input box
   axios
        .post('/api/shorten', { url: document.getElementById('url-field').value })
        .then((data)=>{
            var resultHTML = '<a class="result" href="http://' + data.data.shortUrl + '">'
              + data.data.shortUrl + '</a>';
            document.getElementById('link').innerHTML = resultHTML;
            document.getElementById('clipboard').classList.add('fancyButton');
            document.getElementById('clipboard').innerHTML = 'Copy to Clipboard';
        }); 
  
  });

  document.getElementById('clipboard').addEventListener('click', ()=>{
      console.log("Working");
      copyToClipboard(document.querySelector('.result').innerText);
  })

  function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}