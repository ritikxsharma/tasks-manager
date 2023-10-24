const mongoose = require('mongoose');

const tasks_schema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        user_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true
        }
    }
)

const tasks_model = mongoose.model('tasks_model', tasks_schema)

module.exports = tasks_model