import AnnualBudget from "../models/annualBudgetModel.js";

export const allocateAnnualBudget = async (req, res) => { 
  const { year, allocatedBudget } = req.body;

  try {
    const exists = await AnnualBudget.findOne({ year });
    if (exists) {
      return res.status(400).json({ message: "Budget for this year already exists" });
    }

    const newBudget = new AnnualBudget({
      year,
      allocatedBudget
    });

    await newBudget.save();
    res.status(201).json({ message: "Annual Budget allocated", data: newBudget });

  } catch (err) {
    console.error("Budget Error:", err);
    res.status(500).json({ message: "Failed to allocate budget" });
  }
};

// Get budget for a year
export const getAnnualBudget = async (req, res) => {
  const { year } = req.params;
  try {
    const budget = await AnnualBudget.findOne({ year });
    if (!budget) return res.status(404).json({ message: "No budget found for this year" });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
};
