
import React, {useState, useEffect} from 'react'
import '../App.css';
import Form from '../components/Form';
import List from '../components/List';

function Home() {
    
        const [state, setState] = useState({
            todoList: [],
            activeItem: {
              id: null,
              title: '',
              completed: false,
            },
            editing: false,
          });
        
          const getCookie = (name) => {
            let cookieValue = null;
            if(document.cookie && document.cookie !== '') {
              let cookies = document.cookie.split(';');
              for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
                }
              }
            }
            return cookieValue;
          }
        
        useEffect(() => {
          fetchTasks()
        }, [])
        
        const fetchTasks = () => {
          
          fetch('http://127.0.0.1:8000/api/task-list/')
          .then(response => response.json())
          .then(data => {
            setState({
              todoList:data,
              activeItem: {
                id: null,
                title: '',
                completed: false
              },
              editing: false
            })
          }) 
        }
        
        const handleChange = (e) => {
          
          const value = e.target.value;
          setState({
            ...state,
            activeItem: {
              ...state.activeItem,
              title: value
            }
          })
        }
        
        const handleSubmit = (e) => {
          e.preventDefault();
        
          var csrftoken = getCookie('csrftoken')
        
          let url = 'http://127.0.0.1:8000/api/task-create/';
        
          if(state.editing == true) {
            url = `http://127.0.0.1:8000/api/task-update/${state.activeItem.id}/`
            setState({
              ...state,
              editing: false,
            })
          }
        
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
              'X-CSRFToken': csrftoken,
              
            },
            body:JSON.stringify(state.activeItem)
          }).then((response) => {
            fetchTasks();
            
          }).catch((err) => console.log(err))
          console.log(state.activeItem)
        }
        const tasks = state.todoList;
        
        const startEdit = (task) => {
          setState({
            ...state,
            activeItem: task,
            editing: true,
            
          })
        }
        
        const deleteItem = (task) => {
          let csrftoken = getCookie('csrftoken')
        
          fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-type':'application/json',
              'X-CSRFToken': csrftoken,
            },
          }).then((response) => {
            fetchTasks()
          })
        }
        
        const handleComplete = (task) => {
          let csrftoken = getCookie('csrftoken')
          var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`
        
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
              'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({'completed': !task.completed, 'title': task.title})
          }).then(() => {
            fetchTasks()
          })
        }
        
          return (
            <div className="container">
              <div className="task-container">
                <Form 
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  value={state.activeItem.title}
                  editBtnText = {state.editing === true? 'Edit' : 'Add'}
                />
                 <div id="list-wrapper">
                 {tasks.map((task, index) => (
                      <List 
                        handleComplete={() => handleComplete(task)}
                        startEdit={() => startEdit(task)}
                        deleteItem={() => deleteItem(task)}
                        task = {task}
                        key = {index}
                      />
                    ))}
                 </div>
                    
                
              </div>
            </div>
          );
        }
    


export default Home
