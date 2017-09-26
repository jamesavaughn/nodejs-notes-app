const fs = require('fs');

var fetchNotes =function(){
    try {     //try catch is used to avoid error if file doesn't exist    
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString); //will keep previous notes
    } catch(e) {
        return[]; //empty array

    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => { 
    var notes = fetchNotes(); 
    var note = {
        title:title,
        body:body
    };    
    var duplicateNotes = notes.filter((note) => note.title === title);  //if title is same will return true, otherwise false
    if (duplicateNotes.length === 0){
        notes.push(note); //pushes an element into the array
        saveNotes(notes);
        return note;
    }
};

var getAll = function(){
    return fetchNotes();
};


var getNote = function(title){
    //fetch notes
    //filter notes to return notes who's title matches argument
    //return value 
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title ===title);
    return filteredNotes[0]; 
};

var removeNote = function(title){
    //fetch notes
    //filter notes, removing the one with title of argument
    //save new notes array
    var notes = fetchNotes(); 
    var filteredNotes = notes.filter((note) => note.title !== title);  //populates removed notes with all the one with matching titles
        saveNotes(filteredNotes); //pass in new notes array
        return notes.length !== filteredNotes.length;
    };

var logNote = (note) => {
    //Break on this line and repl to output note
    // use read command with --title
    console.log('-----');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
//add all your exports 
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
