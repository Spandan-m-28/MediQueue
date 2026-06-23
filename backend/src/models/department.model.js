import mongoose , {Schema} from "mongoose";

const departmentSchema = new Schema({
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    averageConsultationTime: {
        type: Number,
        default: 5
    },
    doctorNames: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default:  true
    }
    
},{
    timestamps: true
});

export const Department = mongoose.model("Department", departmentSchema);