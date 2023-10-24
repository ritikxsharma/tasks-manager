import '../../styles/dashboard/_taskslist.scss'
import React, { useEffect, useState } from 'react'
import UpdateButton from '../dashboard/UpdateButton'
import DeleteButton from '../dashboard/DeleteButton'

const TasksList = ({tasks}) => {

  return (
    <div className="tasks-list">
      {
        tasks.length === 0 ? (
          <div className="no-tasks">
            <p>NO TASKS TO SHOW</p>
          </div>
        ) : (
          
          tasks.map((task) =>(
            <div className="task-item" key={task.id}>
              <div className="details">
                <h3>{task.title}</h3>
                <p className='desc'>{task.desc}</p>
                <p className='status'>Status: {task.status}</p>
                <p className='dueDate'>Due Date: {task.dueDate.split('T')[0]}</p>
              </div>
              <div className="user-actions">
                <UpdateButton></UpdateButton>
                <DeleteButton id={task.id}></DeleteButton>
              </div>
            </div>
          ))
      
        )
      }
    </div>
  )
}

export default TasksList