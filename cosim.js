/*
    2016 - Ajay Ramesh
    ajayramesh@berkeley.edu
    ajayramesh.com

    Do whatever you want with it, happy hacking :)
*/

function buildStopwords(string) {
    /*
        Constructs a Set of stop words from a string.
        Stop words are common words the algorithm should ignore.
    */
    const stopWords = new Set();
    const wordArray = string.split('\n');
    for (word of wordArray) {
        stopWords.add(word);
    }
    return stopWords;
}

function sanitizeDoc(d, stopWords){
    d = d.toLowerCase();
    d = d.replace(/[^a-z ]/g, "");
    d = d.trim();
    let a = d.split(" ");
    let b = [];
    for (w of a) {
        if(!stopWords.has(w) && w.length > 0) {
            b.push(w);
        }
    }
    return b.join(" ");
}

function buildVectors(d1, d2) {

    /*
        Given two strings D1, D2, returns two word frequency vectors
        The length of the vector is the number of unique words that appear in
        both documents.
        Each indice of a vector is mapped to a unique word. Its value represents
        the frequency of the word in each respective vector.
        Ex:
        There are 6 unique words between D1, D2
        [fat, cat, sat, hat, lazy, dog]
        D1 = "fat cat sat hat" => [1, 1, 1, 1, 0, 0]
        D2 = "lazy dog sat hat" => [0, 0, 1, 1, 1, 1]
        inspired by http://stackoverflow.com/a/14948723/896112
    */

    function counter(d) {
        /*
            Given document D, constructs a dictionary of the form 
            {word: frequency}
        */
        const counts = new Map();
        for (w of d.split(" ")) {
            if (w.length > 0) {
                if (!counts.has(w)) {
                    counts.set(w, 0);
                }
                counts.set(w, counts.get(w)+1);
            }
        }
        return counts;
    }

    /* Create Set of all unique words in both sentences */
    const allWords = new Set();
    const d1Count = counter(d1);
    const d2Count = counter(d2);

    for (j of d1Count.keys()) {
        allWords.add(j);
    }

    for (k of d2Count.keys()) {
        allWords.add(k);
    }

    /* Initialize two vectors of the same size */
    const vSize = allWords.size;
    const v1 = new Array(vSize);
    const v2 = new Array(vSize);

    /* Populate vectors with frequency values */
    let c = 0;
    for (w of allWords) {
        v1[c] = d1Count.get(w) || 0;
        v2[c] = d2Count.get(w) || 0;
        c++;
    }

    return [v1, v2];
}

function cosim(v1, v2) {

    /* 
        The percentage similarity is the cosine of the angle between two vectors v1 and v2
        Let V be a vector and let |V| be its magnitude.
        The dot product between two vectors A, B is defined as:
        dot(A, B) = |A|*|B|*cos(theta)
        so...
        cos(theta) = (|A|*|B|) / dot(A, B)
        Ranges from 0 to 1
    */
    
    function dotProduct(v1, v2) {
        s = 0;
        for (let i = 0; i < v1.length; i++) {
            s+=v1[i]*v2[i];
        }
        return s;
    }

    function magnitude(v) {
        s = 0;
        for (let i = 0; i < v.length; i++) {
            s+=Math.pow(v[i], 2);
        }
        return Math.sqrt(s);
    }

    return dotProduct(v1, v2) / (magnitude(v1) * magnitude(v2));
}