import { Token } from "../models/token.model.js";
import { Queue } from "../models/queue.model.js";
import { Department } from "../models/department.model.js";

const joinQueue = async (req, res) => {
  try {
    const { queueId } = req.params;
    const patientId = req.user._id;

    console.log(queueId);
    console.log(patientId);
    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    if (queue.queueStatus !== "active") {
      return res.status(400).json({
        success: false,
        message: "Queue is not active",
      });
    }

    const existingToken = await Token.findOne({
      patientId,
      queueId,
      status: {
        $in: ["waiting", "active", "missed"],
      },
    });

    if (existingToken) {
      return res.status(409).json({
        success: false,
        message: "Patient already exists in the queue",
      });
    }

    const department = await Department.findById(queue.departmentId);

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department does not exists",
      });
    }

    const tokenNumber = queue.totalTokens + 1;

    // Calculate patients ahead
    const patientsAhead = tokenNumber - queue.currentToken - 1;

    // Calculate wait time
    const estimatedWaitTime =
      patientsAhead * department.averageConsultationTime;

    // Create token
    const token = await Token.create({
      patientId,
      queueId,
      tokenNumber,
      status: "waiting",
      estimatedWaitTime,
      joinedAt: new Date(),
    });

    // Update queue
    queue.totalTokens += 1;
    await queue.save();

    return res.status(201).json({
      success: true,
      message: "Token created successfully",
      tokenNumber,
      estimatedWaitTime,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMyToken = async (req,res) => {
  try{
    const {_id: userId} = req.user;  

    const token = await Token.find({patientId: userId});

    if(!token){
      return res.status(400).json({
        success: false,
        message: "Token does not exists"
      });
    }

    console.log(token);
    return res.status(200).json({
      success: true,
      message: "Token returned successfully",
      token
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}

export { joinQueue , getMyToken};
