import React, {useState} from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
// import notes from "../notes";
import CreateNote from "./CreateNote";


function App(){
    const [notes, setNotes] = useState([]);

    function addNote(newnote){
        setNotes(prevNotes => {
            return [...prevNotes, newnote];
        });
    }
    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((note, index) => {
                return index !== id;
            })
        })
    }
    return(
        <div>
            <Header />
            <CreateNote onAdd={addNote} 
            />
            {notes.map((noteItems, index)  => 
        <Note 
            key = {index}
            id = {index}
            title = {noteItems.title}
            content = {noteItems.content}
            onDelete = {deleteNote}
        /> )}
            <Footer />
        </div>
    );
};

export default App;