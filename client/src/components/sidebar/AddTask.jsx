import '../../styles/asidebar/_addtask.scss'
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../Loading/Spinner'
import { startLoading, stopLoading } from '../../redux/actions/loadingActions'

const AddTask = () => {

    const token = useSelector((state) => state.auth.token)
    const loading = useSelector((state) => state.loading)
    const dispatch = useDispatch()
    const [isSuccess, setIsSuccess] = useState(false)

    const [newTask, setNewTask] = useState({
        id: uuidv4(),
        title: '',
        desc: '',
        status: 'in progress',
        dueDate: ''
    })

    const handleChange = (e) =>{
        console.log(newTask);
        setNewTask(() => ({
            ...newTask, [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        dispatch(startLoading())
        try{
            const res = await fetch('https://tasks-manager-server-2909.onrender.com/api/tasks', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newTask)
            })
            console.log(res.status);
            if(res.status === 201){
                console.log(await res.json());
                dispatch({
                    type: 'ADD_TASK',
                    payload: newTask
                })
            }
            else{
                console.log(`Error: ${await res.json()}`);
            }

        }catch(error){
            console.log(`Error: ${error}`);
        }finally{
            dispatch(stopLoading())
        }
    }

  return (
    <div className='add-user-container'>
        <div className="heading">
            Add task
        </div>
        <div className="details">

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" id='title' value={newTask.title} onChange={handleChange} placeholder=' ' autoComplete='none' required/>
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-group">
                    <textarea name="desc" id="desc" cols="30" rows="2" onChange={handleChange} value={newTask.desc} placeholder=' ' autoComplete='none' required></textarea>
                    <label htmlFor="desc">Description</label>
                </div>
                <div className='form-group' id='status'>
                    <label>Status:</label>
                    
                    <label>
                        <input
                            type='checkbox'
                            id='status'
                            value='in progress'
                            checked={newTask.status === 'in progress'}
                            onChange={handleChange}
                        />{' '}
                        In Progress
                    </label>

                    <label>
                        <input
                            type='checkbox'
                            id='status'
                            value='completed'
                            checked={newTask.status === 'completed'}
                            onChange={handleChange}
                        />{' '}
                        Completed
                    </label>
                </div>
                
                <div className='form-group' id='due-date'>
                    <input
                        type='date'
                        id='dueDate'
                        value={newTask.dueDate}
                        onChange={handleChange}
                    />
                    <label htmlFor='dueDate'>Due Date</label>
                </div>

                <div className="submit-btn" id='submit-btn'>
                    {
                        loading ? (
                            <Loading></Loading>
                        // ) : isSuccess ? (
                        //     <span class="material-symbols-outlined">
                        //         add_task
                        //     </span>
                        ) : (
                            <button type='submit'>ADD</button>
                        )
                    }
                </div>

            </form>
        </div>
    </div>
  )
}

export default AddTask