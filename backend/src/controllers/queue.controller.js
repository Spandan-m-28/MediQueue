import { Queue } from "../models/queue.model.js";
import { Department } from "../models/department.model.js";
import { response } from "express";
import { Token } from "../models/token.model.js";

const createQueue = async (req, res) => {
  try {
    const { departmentId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department dosent exists",
      });
    }

    const existingQueue = await Queue.findOne({
      departmentId,
      queueStatus: "active",
    });

    if (existingQueue) {
      return res.status(409).json({
        success: false,
        message: "Queue Already exists",
      });
    }

    const queue = await Queue.create({
      departmentId,
      totalTokens: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Queue created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Queue returned successfully",
      queue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateQueueStatus = async (req, res) => {
  try {
    const { queueId } = req.params;
    const { queueStatus } = req.body;

    if (
      queueStatus == "active" ||
      queueStatus == "paused" ||
      queueStatus == "closed"
    ) {
      const queue = await Queue.findById(queueId);
      if (!queue) {
        return res.status(404).json({
          success: false,
          message: "Queue not found",
        });
      }

      queue.queueStatus = queueStatus;
      await queue.save();

      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Bad request",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};

const callNextToken = async (req, res) => {
  try {
    const { queueId } = req.params;

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

    const activeToken = await Token.findOne({
      queueId,
      status: "active",
    });

    if (activeToken) {
      return res.status(400).json({
        success: false,
        message: "Complete or miss the current active token first",
      });
    }

    const nextTokenNumber = queue.currentToken + 1;

    const token = await Token.findOne({
      queueId,
      tokenNumber: nextTokenNumber,
      status: "waiting",
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "No waiting token found",
      });
    }

    token.status = "active";
    await token.save();

    queue.currentToken = nextTokenNumber;
    await queue.save();

    return res.status(200).json({
      success: true,
      message: "Next token called successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const completeCurrentToken = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    const activeToken = await Token.findOne({
      queueId,
      status: "active",
    });

    if (!activeToken) {
      return res.status(404).json({
        success: false,
        message: "No active token found",
      });
    }

    activeToken.status = "completed";
    activeToken.completedAt = new Date();

    await activeToken.save();

    return res.status(200).json({
      success: true,
      message: "Token completed successfully",
      token: activeToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const missCurrentToken = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        success: false,
        message: "Queue not found",
      });
    }

    const activeToken = await Token.findOne({
      queueId,
      status: "active",
    });

    if (!activeToken) {
      return res.status(404).json({
        success: false,
        message: "No active token found",
      });
    }

    activeToken.status = "missed";

    await activeToken.save();

    return res.status(200).json({
      success: true,
      message: "Token marked as missed",
      token: activeToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  createQueue,
  getQueue,
  updateQueueStatus,
  callNextToken,
  completeCurrentToken,
  missCurrentToken,
};
