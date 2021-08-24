import React from 'react'

function List({handleComplete, startEdit, deleteItem, task, index}) {
    return (
        <div id="list-wrapper">
        
          <div key={index} className="task-wrapper flex-wrapper">
            <div onClick={handleComplete} style={{flex: 7}}>
              {task.completed === false ? (<span>{task.title}</span>)
              : 
              (<strike>{task.title}</strike>)}         
            </div>
            <div style={{flex: 1}}>
              <button onClick={startEdit} className="btn btn-sm btn-outline-danger">Edit</button>
            </div>
            <div style={{flex: 1}}>
                <button onClick={deleteItem} className="btn btn-sm btn-danger">delete</button>
            </div>
          </div>
      
    </div> 
    )
}

export default List
