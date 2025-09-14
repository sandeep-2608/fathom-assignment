import Ship from "../models/ShipModel.js";
import { shipValidationSchema } from "../validation/schemas.js";

// GET /api/ships - Get all ships
export const getAllShips = async (req, res) => {
  try {
    const ships = await Ship.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { ships },
      message: "Ships fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving ships",
      error: error.message,
    });
  }
};

// GET /api/ships/:id - Get a specific ship
export const getShipById = async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.id);
    if (!ship) {
      return res
        .status(404)
        .json({ success: false, message: "Ship not found" });
    }
    res.status(200).json({
      success: true,
      data: { ship },
      message: "Ship fetched successfully",
    });
  } catch (error) {
    console.error("Error retrieving ship:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving ship",
      error: error.message,
    });
  }
};

// POST /api/ships - Create a new ship
export const createNewShip = async (req, res) => {
  try {
    // Basic validation
    const { error, value } = shipValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.details.map((err) => err.message),
      });
    }

    // Check if ship name already exists
    const existingShip = await Ship.findOne({ name: value.name });
    if (existingShip) {
      return res.status(400).json({
        success: false,
        message: "Ship with this name already exists",
      });
    }

    // create new ship
    const ship = new Ship(value);
    await ship.save();

    res.status(201).json({
      success: true,
      message: "Ship created successfully",
      data: { ship },
    });
  } catch (error) {
    console.error("Create ship error:", error);

    // Handle duplicate ship name
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Ship with this name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating ship",
    });
  }
};

// PUT /api/ships/:id - Update a specific ship
export const updateShip = async (req, res) => {
  try {
    const { error, value } = shipValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    // Update ship
    const ship = await Ship.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });
    if (!ship) {
      return res.status(404).json({
        success: false,
        message: "Ship not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Ship updated successfully",
      data: { ship },
    });
  } catch (error) {
    console.error("Error updating ship:", error);
    res.status(500).json({
      success: false,
      message: "Error updating ship",
      error: error.message,
    });
  }
};

// Delete /api/ships/:id - Delete a specific ship
export const deleteShip = async (req, res) => {
  try {
    const ship = await Ship.findByIdAndDelete(req.params.id);

    // Check if ship exists
    if (!ship) {
      return res.status(404).json({
        success: false,
        message: "Ship not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Ship deleted successfully",
      data: { ship },
    });
  } catch (error) {
    console.error("Error deleting ship:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting ship",
      error: error.message,
    });
  }
};
