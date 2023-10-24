import '../styles/pages/_dashboard.scss'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLoading, stopLoading } from "../redux/actions/loadingActions";
import Sidebar from '../components/dashboard/Sidebar'
import Searchbar from '../components/dashboard/Searchbar'
import Filter from '../components/dashboard/Filter'
import TasksList from '../components/dashboard/TasksList'
import AddTask from '../components/sidebar/AddTask';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const loading = useSelector((state) => state.loading)
  const tasks = useSelector((state)=>state.tasks.tasksList)
  const searchQuery = useSelector((state) => state.tasks.search_query)
  const dispatch = useDispatch()
  const [filteredTasks, setFilteredTasks] = useState([])
  const [content, setContent] = useState(null)
  const [sortOption, setSortOption] = useState('All')

  useEffect(()=>{
      dispatch(startLoading())
      fetchTasks(token)
  }, [token])

  async function fetchTasks(){
    dispatch(startLoading())
    try {
      const res = await fetch('https://tasks-manager-server-2909.onrender.com/api/tasks',{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if(res.ok){
        const data = await res.json()
        dispatch(
          {
            type: 'SET_TASKS',
            payload: data
          }
        )
      }
      else{
        console.log(`Failed to fetch data: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally{
      dispatch(stopLoading())
    }
  }

  useEffect(() => {
    setContent(<TasksList tasks={filteredTasks} />);
  }, [filteredTasks]);

  useEffect(()=>{

    const filtered = tasks.filter((task) => {
      return (
        (task.title.replace(/\s+/g, '').toLowerCase().includes(searchQuery.replace(/\s+/g, '').toLowerCase())) ||
        (task.desc.replace(/\s+/g, '').toLowerCase().includes(searchQuery.replace(/\s+/g, '').toLowerCase()))
      )
    })

    setFilteredTasks(filtered)

  }, [searchQuery, tasks])

  useEffect(() =>{

    const sorted = tasks.filter((task) => {
      if(sortOption === 'All')  return true;
      else if(sortOption === 'Completed') return task.status === 'completed'
      else if(sortOption === 'In Progress') return task.status === 'in progress'
      else  return true
    })

    setFilteredTasks(sorted)

  }, [sortOption])

  const handleSort = (option) =>{
    setSortOption(option)
  }

  const handleLogout = () =>{
    dispatch({
      type: 'LOGOUT'
    })

    navigate('/login')
  }

  const handleMenuItemClick = (item) =>{
    switch(item){
      case 'home':
        setContent(
          <TasksList tasks={filteredTasks}/>
        )
        break

      case 'adduser':
        setContent(
          <AddTask/>
        )
        break

      case 'logout':
        handleLogout()
        break

      default:
        setContent(
          <TasksList tasks={filteredTasks}/>
        )
    }
  }


  return (
    <div className='dashboard-container'>
      <div className="asidebar">
        <Sidebar onMenuItemClick={handleMenuItemClick}></Sidebar>
      </div>
      <div className="main">
        <div className="search-filter">
          <Searchbar></Searchbar>
          <Filter handleSort={handleSort} ></Filter>
        </div>
        <div className="content">
          {
            loading ? (
              <p>Loading...</p>
            ) : (
              content
            )
          }
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard