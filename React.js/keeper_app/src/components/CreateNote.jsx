import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateNote(props){
    const [isExpanded, setIsExpanded] = useState(false);
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

    function Expand(){
        setIsExpanded(true);
    }

return (
    <div>
        <form className="create-note">
        {isExpanded && (<input onChange={handleChange} name="title" type="text" placeholder="Title" value={note.title} />)}
            
            <textarea onClick={Expand} onChange={handleChange} name="content" placeholder="Content" rows={
                isExpanded ? 3 : 1
            } value={note.content}/>
            <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
                <AddIcon />
            </Fab></Zoom>
        </form>
    </div>
)
}

export default CreateNote;