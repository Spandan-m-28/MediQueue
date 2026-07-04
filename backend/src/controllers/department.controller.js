import { Hospital } from "../models/hospital.model.js";
import { Department } from "../models/department.model.js";

const createDepartment = async (req, res) => {
  try {
    const { hospitalId, name, doctorNames } = req.body;
    if (!hospitalId?.trim() || !name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Some fields are missing",
      });
    }

    if (
      !Array.isArray(doctorNames) ||
      doctorNames.length === 0 ||
      doctorNames.some((doctor) => !doctor?.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one valid doctor name is required",
      });
    }

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const existingDepartment = await Department.findOne({
      hospitalId: hospital._id,
      name,
    });

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department exists within same hospital",
      });
    }

    const department = await Department.create({
      hospitalId: hospital._id,
      name,
      doctorNames,
    });

    return res.status(200).json({
      success: true,
      message: "Department Created Successfully",
      department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get department by hospital Id
const getDepartments = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const departments = await Department.find({ hospitalId });

    return res.status(200).json({
      success: true,
      message: "Departments found successfully",
      departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId).populate(
      "hospitalId",
      "name city",
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createDepartment, getDepartments ,getDepartmentById};
