const mongoose = require('mongoose')
const crypto =  require('crypto')

// Here our user schema is defined

const userSchema = new mongoose.Schema({
    profile:
    {
        type:String,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    email:
    {
        type:String,
        trim: true,
        unique:true,
        max:50,
        index: true,
        lowercase:true
    },
    profile:
    {
        type:String,
        required: true
    },
    hashed_password:
    {
        type:String,
        required:true
    },
    salt: String,
    resetPasswordLink:
    {
        data:String,
        default:'',
    }
},{timestamp:true});

// Here we toss the entered password into a salted, hashed encryption algorithm

userSchema.virtual('password')
    .set(function(password){
        //declare password
        this._password = password
        //initialize salt
        this.salt = this.makeSalt()
        //
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function(){
        return this._password
    });
    userSchema.methods = {
        authenticate: function(plainText)
        {
            return this.encryptPassword(plainText) === this.hashed_password;

        },

        encryptPassword: function(password){
            if(!password) return ''
            try
            {
                return crypto.createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex')
            }
            catch(err)
            {
                return ''
            }
        },
        makeSalt: function(){
            return Math.round(new Date().valueOf()*Math.random())+'';
        }
    };

const User = module.exports = mongoose.model('User',userSchema);
