import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({

    FullName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    nativeLanguage: {
        type: String,
        default: "",
    },
    learningLanguage: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    isOnboarded: {
        type: Boolean,
        default: false,
    },

    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

},

{timestamps: true}
);

const User = mongoose.model("User", userSchema);

// Method to compare password

userSchema.pre("save", async function (next) {

if (!this.isModified("Password")) return next();

try {
    const salt= await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
} catch (error) {
    next(error);
}


});
    

export default User;