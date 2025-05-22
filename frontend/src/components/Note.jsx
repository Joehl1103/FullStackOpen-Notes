const Note  =(props)=> {
    const label = props.note.important ? 'make not important' : 'make important';

    return (
        <li className='note'>
          {props.note.content} {props.note.important === true && "🚨Important🚨"} 
          <button onClick={props.toggleImportanceOf}>{label}</button>

        </li>
    )
  
  }

  export default Note