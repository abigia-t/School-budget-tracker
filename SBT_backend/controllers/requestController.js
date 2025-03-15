import Request from "../models/requestModel.js";

// Predefined actorId mapping
const ACTOR_ID_MAPPING = {
  "School Director": "1",
  "Human Resource Head": "2",
  "Financial and Resource Head": "3",
};

// Actor submits an expenditure request
export const submitRequest = async (req, res) => {
  try {
    let { actorId, actorRole, requestCategory, fiscalYear, description, amount } = req.body;

    // Automatically set actorId based on predefined roles
    if (!actorId && actorRole) {
      actorId = ACTOR_ID_MAPPING[actorRole] || null; // Assign predefined actorId
    }

    if (!actorId) {
      return res.status(400).json({ message: "Invalid actor role or actorId is required" });
    }

    const attachments = req.files ? req.files.map(file => file.path) : [];

    const newRequest = new Request({
      actorId,
      requestCategory,
      fiscalYear,
      description,
      amount: parseFloat(amount),
      attachments,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully", request: newRequest });
  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).json({ message: "Error submitting request", error: error.message });
  }
};

// Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find(); // Fetch all requests
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};
