const mongoose = require('mongoose');

const auth_schema = mongoose.Schema(
    {
        id: {
            type: String,
            required: [true],
            unique: [true]
        },
        name: {
            type: String,
            required: [true]
        },
        email: {
            type: String,
            required: [true],
            unique: [true]
        },
        password: {
            type: String,
            required: [true]
        }
    }
)

const auth_model = mongoose.model('auth_model', auth_schema)

module.exports = auth_model