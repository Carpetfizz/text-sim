/*
    2016 - Ajay Ramesh
    ajayramesh@berkeley.edu
    ajayramesh.com

    Do whatever you want with it, happy hacking :)
*/

const stopWords = buildStopwords(stopwords);
    
const doc1 = document.getElementById("doc1");
const doc2 = document.getElementById("doc2");
const compBtn = document.getElementById("compare-btn");

const compButton = {
    showPercentage: function(p) {
        compBtn.disabled = true;
        compBtn.textContent = p;
    },
    showCompare: function() {
        compBtn.disabled = false;
        compBtn.textContent = "Compare";
    }
}

doc1.onkeyup = compButton.showCompare;
doc2.onkeyup = compButton.showCompare;
compBtn.onclick = compare;

function compare() {
    const cleanD1 = sanitizeDoc(doc1.value, stopWords);
    const cleanD2 = sanitizeDoc(doc2.value, stopWords);
    console.log(cleanD1+"\n", cleanD2);
    const vectors = buildVectors(cleanD1, cleanD2);
    const v1 = vectors[0];
    const v2 = vectors[1];
    const sim = Math.round((cosim(v1, v2)*100)*10)/10+"%";
    compButton.showPercentage(sim);
}