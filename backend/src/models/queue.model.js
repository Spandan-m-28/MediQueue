import mongoose , {Schema} from "mongoose";

const queueSchema = new Schema({
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    currentToken: {
        type: Number,
        default: 0
    },
    totalTokens: {
        type: Number,
        required: true
    },
    queueStatus: {
        type: String,
        enum: ["active", "paused", "closed"],
        default: "active"
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date
    }
},{
    timestamps: true
});

export const Queue = mongoose.model("Queue", queueSchema);