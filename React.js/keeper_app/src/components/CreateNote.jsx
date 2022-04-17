import React, {useState} from "react";

function CreateNote(props){

    const  [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event){
        const {name, value} = event.target;
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        })
    }
    function submitNote(event){

        props.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        //prevent refreshing page after submitting
        event.preventDefault();
    }

return (
    <div>
        <form className="create-note">
            <input onChange={handleChange} name="title" type="text" placeholder="Title" value={note.title} />
            <textarea onChange={handleChange} name="content" placeholder="Content" rows={3} value={note.content}/>
            <button onClick={submitNote}>Add</button>
        </form>
    </div>
)
}

export default CreateNote;