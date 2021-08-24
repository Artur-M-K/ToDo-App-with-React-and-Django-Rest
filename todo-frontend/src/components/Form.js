import React from 'react'

function Form({onSubmit, onChange, value, editBtnText}) {
    return (
        <div id="form-wrapper">
          <form action="" id="form" onSubmit={onSubmit}>
            <div className="flex-wrapper">
              <div id="inputForm" style={{flex: 6}}>
                <label htmlFor="title"><span className="position-absolute top-0 start-100 translate-middle badge bg-danger">{editBtnText}</span></label>
                <input 
                  className="form-control" 
                  type="text" 
                  id="title" 
                  name="title" 
                  placeholder="Add task..."
                  onChange={onChange}
                  value={value}  
                />
              </div>
              <div style={{flex:1}}>
                <input 
                  type="submit" 
                  id="submit" 
                  className="btn btn-warning" 
                  name="add"
                />
              </div>
            </div>
          </form>
        </div>
    )
}

export default Form
