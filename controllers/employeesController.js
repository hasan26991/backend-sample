const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "no employees found!" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  try {
    const result = await Employee.create({
      firstname,
      lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: `id parameteer is required` });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req.body?.id) {
    return res.status(400).json({ message: `id parameteer is required` });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  try {
    const result = await Employee.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getEmployee = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: `id parameteer is required` });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
