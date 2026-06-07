import mongoose , {Schema} from "mongoose";

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdBy: {
        // User Id of staff who created the account for hospital
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

export const Hospital = mongoose.model("Hospital", hospitalSchema);