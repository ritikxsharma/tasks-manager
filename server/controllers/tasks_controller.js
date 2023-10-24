const tasks_model = require('../models/tasks_model');
const { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } = require('../middlewares/errorHandling/errors');

const getTasks = async(req, res) =>{
    try {
        const tasks = await tasks_model.find({user_id: req.current.user.id})
        res.status(200).json(tasks)

    } catch (error) {
        res.json(error)
    }
    
}

const createTask = async(req, res, next) =>{
    try {
        const{
            id,
            title,
            desc,
            status = "in progress",
            dueDate
        } = req.body
        console.log(req.body);
        if(!title || !desc){
            throw new BAD_REQUEST_ERROR('All fields are necessary')
        }

        else{
            const new_task = await tasks_model.create({
                id: id,
                user_id: req.current.user.id,
                title: title,
                desc: desc,
                status: status,
                dueDate: new Date(dueDate)
            }) 
            res.status(201).json({
                msg: "Task added",
                task_added: new_task
            })
        }

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getTask = async(req, res) =>{

    try {
        
        const findTask = await tasks_model.findOne({id: req.params.id})

        if(!findTask){
            res.json("No task found")
        }

        else{
            res.status(200).json({
                task: findTask
            })
        }

    } catch (error) {
        res.json(error)
    }

}

const updateTask = async(req, res) =>{
    
    try{
        const{
            title,
            desc,
            status = "in progress"
        } = req.body
    
        if(!title || !desc){
            res.send("Title and desc are mandatory")
        }
    
        const updatedTask = {
            title: title,
            desc: desc,
            status: status
        }

        await tasks_model.findOneAndUpdate(
            { id: req.params.id },
            { $set: updatedTask },
            { new: true }
        )

        res.status(201).json({
            msg: "Task Updated",
            tasks: await tasks_model.findOne({id: req.params.id})
        })
    }catch(error){
        res.json(error)
    }

}

const deleteTask = async(req, res) =>{
    
    try {
        
        const findTask = await tasks_model.findOne({id: req.params.id})

        if(!findTask){
            throw new NOT_FOUND_ERROR("Task not found!!!")
        }

        else{
            await tasks_model.deleteOne({id: req.params.id})
            res.status(200).json({
                msg: "Task deleted",
                deleted_task: findTask
            })
        }

    } catch (error) {
        res.json(error)
    }
}


module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}