const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs'); //require yargs module after installing with --save

const notes = require('./notes.js'); //require your files

const titleOptions = {
    describe: 'Title of Note',
    demand: true, //makes command required
    alias: 't' //alias to run command
};

const bodyOptions = {
        describe: 'Note Contents',
        demand: true,
        alias: 'b'
};

//CONFIGURE YARGS TO CLEAN UP YOUR CONSOLE PROMPTS
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions, 
        body: bodyOptions
    })
    .command('list', 'List all notes', {
        title: titleOptions,
    })
    .command('read', 'Read a note', {
        title: titleOptions,
    })

    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help() 
    .argv;
var command = argv._[0]; //grab the first object in the yargs array

if (command == 'add'){
    var note = notes.addNote(argv.title, argv.body); //function in notes.js
    if (note) { //checks to see if note is an object
        console.log('note created');
        notes.logNote(note);        
    } else {
        console.log('note title taken');
    }
} else if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    //call logNote once for every item in the array
    allNotes.forEach((note) => notes.logNote(note));

} else if (command == 'read'){
    //check to see if getNote return value is present and return print out
    //print flow
    var note = notes.getNote(argv.title); //store return value from getNote
    if (note) {
        console.log('Here is your note');
        notes.logNote(note);
    } else {
        console.log('note not found');
    }
 } else if (command == `remove`) {
    var noteRemoved = notes.removeNote(argv.title); //store boolean
    //turmunary operator to test boolean
    //var message = [condition] ? ['message if true'] : ['message if false'];
    var message = noteRemoved ? 'note was removed' : 'note not found';
    console.log(message); //print body attribute
 } else {
    console.log('command not recognized');
} 
