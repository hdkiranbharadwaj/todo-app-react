import React,{ Fragment, useState} from "react";

function EditTodo(params){
   async function updateDescription(e){
    e.preventDefault();
    try{
        const body={description}
        const response = await fetch(`http://localhost:5000/todos/${params.todo.todo_id}`,
        {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
        })
        console.log(response);
        window.location="/"
    }catch(err){
        console.error(err.message);
    }
    }
    const [description,setDescription] = useState(params.todo.description)
    return (<Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${params.todo.todo_id}`}>
          Edit
        </button>
        
        <div className="modal" id={`id${params.todo.todo_id}`} onClick={()=>{
                    setDescription(params.todo.description)
                }}>
          <div className="modal-dialog">
            <div className="modal-content">
        
              <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={()=>{
                    setDescription(params.todo.description)
                }}>&times;</button>
              </div>
        
              <div className="modal-body">
                <input type="text" className="form-control" value={description} onChange={e=>{
                    setDescription(e.target.value)
                }}></input>
              </div>
        
              <div className="modal-footer">
              <button type="button" className="btn btn-warning" onClick={(e)=>{
                updateDescription(e)
              }}     
              >Edit</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{
                    setDescription(params.todo.description)
                }}>Close</button>
              </div>
            </div>
          </div>
        </div>
        </Fragment>)
}
export default EditTodo;