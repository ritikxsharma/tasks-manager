const initialState = {
    tasksList: [],
    search_query: ''
}

const tasksReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SEARCH_QUERY':
            return{
                ...state,
                search_query: action.payload
            }

        case 'SET_TASKS':
            return{
                ...state,
                tasksList: action.payload
            }
        
        case 'ADD_TASK':
            return{
                ...state,
                tasksList:[
                    ...state.tasksList,
                    action.payload
                ]
            }
        
        case 'DELETE_TASK':
            return{
                ...state,
                tasksList: state.tasksList.filter((task) => task.id !== action.payload)
            }
        
        case 'UPDATE_TASK':
            return{
                ...state,
                tasksList: state.tasksList.map((task) => {
                    if(task.id === action.payload.id){
                        return{
                            ...task,
                            ...action.payload.updatedTask
                        }
                    }
                    return task
                })
            }

        default:
            return state
    }
}

export default tasksReducer