//import axios

// import axios from 'axios';

// add an event listener to the shorten button for when the user clicks it

//Dark URL
if(document.querySelector('.dark')!=null){
    document.querySelector('.dark').addEventListener('click', function(){
    const darkenButton = document.querySelector('.dark');
     darkenButton.disabled = true;
     darkenButton.innerText = 'Darkening';
        // AJAX call to /api/shorten with the URL that the user entered in the input box
    if((/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/).test(document.getElementById('url-field').value))
    {    
            // console.log('Working');
            axios
                    .post('/api/shortenDark', { url: document.getElementById('url-field').value })
                    .then((data)=>{
                        var resultHTML = '<a class="result" href="http://' + data.data.shortUrl + '">'
                        + data.data.shortUrl + '</a>';
                        document.getElementById('link').innerHTML = resultHTML;
                        document.getElementById('clipboard').classList.add('fancyButton');
                        document.getElementById('clipboard').innerHTML = 'Copy to Clipboard';
                        darkenButton.disabled = false;
                        darkenButton.innerText = "Darken"
                    }); 
        }
        else{
            darkenButton.innerText = 'Darken';
            // console.log('Not Working');
            var resultHTML = "Please enter a valid URL";
            document.getElementById('link').innerHTML = resultHTML;
            document.getElementById('clipboard').classList.add('fancyButton');
            document.getElementById('clipboard').innerHTML = 'Try Again';
            darkenButton.disabled = false;
        }
    
    });
}



if(document.querySelector('.button-shorten')!=null){
    document.querySelector('.button-shorten').addEventListener('click', function(){
    // AJAX call to /api/shorten with the URL that the user entered in the input box
   if((/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}/).test(document.getElementById('url-field').value))
   {    
        axios
                .post('/api/shorten', { url: document.getElementById('url-field').value })
                .then((data)=>{
                    var resultHTML = '<a class="result" href="http://' + data.data.shortUrl + '">'
                    + data.data.shortUrl + '</a>';
                    document.getElementById('link').innerHTML = resultHTML;
                    document.getElementById('clipboard').classList.add('fancyButton');
                    document.getElementById('clipboard').innerHTML = 'Copy to Clipboard';
                }); 
    }
    else{
        var resultHTML = "Please enter a valid URL";
        document.getElementById('link').innerHTML = resultHTML;
        document.getElementById('clipboard').classList.add('fancyButton');
        document.getElementById('clipboard').innerHTML = 'Try Again';
    }
  
    });
}

document.getElementById('clipboard').addEventListener('click', ()=>{
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

document.querySelector('.table').
    addEventListener('click', (e)=>{
    if(e.target.classList.contains('clip_board')){
        copyToClipboard(e.target.parentNode.parentNode.innerText);
    }
   
})



