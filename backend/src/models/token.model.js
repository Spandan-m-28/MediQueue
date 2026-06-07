import mongoose,{Schema} from "mongoose";

const tokenSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    queueId: {
        type: Schema.Types.ObjectId,
        ref: "Queue",
        required: true
    },
    tokenNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            "waiting",
            "active",
            "completed",
            "missed",
            "cancelled"
        ],
        default: "waiting"
    },
    estimatedWaitTime: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    completedAt: {
        type: Date
    }
},{
    timestamps: true
})

export const Token = mongoose.model("Token",tokenSchema);