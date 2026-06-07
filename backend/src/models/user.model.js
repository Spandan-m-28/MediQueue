import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: { // patient | staff | admin
        type: String,
        enum: ["patient", "staff", "admin"],
        required: true
    },
    hospitalId: { 
        // Optional for staff
        type: Schema.Types.ObjectId,
        ref: "Hospital"
    }

},{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);