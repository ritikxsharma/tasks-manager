import '../../styles/dashboard/_delete-update-btn.scss'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/actions/loadingActions";
import Spinner from '../Loading/Spinner'

const DeleteButton = ({id}) => {
  const token = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  const handleDelete = async() =>{
    dispatch(startLoading())
    try {
      const res = await fetch(`http://localhost:5000/api/task/${id}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.status === 200){
        console.log(await res.json())
        dispatch({
          type: 'DELETE_TASK',
          payload: id
        })
      }
      else{
        console.log(`Error: ${await res.json()}`);
      }

    } catch (error) {
      console.log(`Error: ${error}`);
    } finally{
      dispatch(stopLoading())
    }
  }

  return (
    <button className='btn' id='delete-btn' onClick={handleDelete}>
      <span className="material-symbols-outlined" >
        delete
      </span>
    </button>
  )
}

export default DeleteButton