const {Schema, model} = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            this.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)
