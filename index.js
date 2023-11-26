const input = document.getElementById('input');
const infoText = document.getElementById('info-text');
const meaningContainer = document.getElementById('meaning-container');
const title = document.getElementById('title');
const meaning = document.getElementById('meaning');
const audio = document.getElementById('audio');

/**
 * Takes in a word entered in text box, if the word is found valid, returns a definition and 
 * an audio clip of pronunciation, if not returns an error and tells to try again
 * @param {*} word - the word entered, that is used for returning definition
 */
async function fetchAPI(word){
    try{
        infoText.style.display = "block";
        meaningContainer.style.display = 'none';
        infoText.innerText = `Searching the meaning of "${word}"`;
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result= await fetch(url).then((res) => res.json());

        if(result.title) {
            meaningContainer.style.display = "block";
            infoText.style.display = "none";
            title.innerText = word;
            meaning.innerText = "N/A";
            audio.style.display = "none";
        }else{
            infoText.style.display = "none";
            meaningContainer.style.display = "block";
            audio.style.display = "inline-flex";
            title.innerText = result[0].word;
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
        }
    }catch(error){
        console.log(error);
        infoText.innerText = "An error happened, try again later";
    }
}


input.addEventListener("keyup", (e) =>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
});