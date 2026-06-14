import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Hospital } from "../models/hospital.model.js";

// Controller for creating hospital
const createHospital = async (req, res) => {
  try {

    const { name, address, city, state, pincode, phone, email } = req.body;
    if (
      [name, address, city, state, pincode, phone, email].some(
        (field) => field?.trim() === "",
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingHospital = await Hospital.findOne({
      $or: [{ email, phone }],
    });

    if (existingHospital) {
      return res.status(409).json({
        success: false,
        message: "Hospital Already exists",
      });
    }
    console.log("Hi");
    const hospital = await Hospital.create({
      name,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      createdBy: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Hospital Created Successfully",
      hospital: hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { createHospital };
