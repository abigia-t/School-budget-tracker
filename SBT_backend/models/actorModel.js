import mongoose from "mongoose";

const actorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, // Ensure hashing before saving
    phoneNumber: { type: String, required: true, unique: true, index: true },
    address: { type: String, required: true },
    role: {
      type: String, 
      required: true,
      enum: [
        "General Manager",
<<<<<<< HEAD
        "School Director", 
=======
        "School Director",
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
        "System Admin",
        "Auditor",
        "Human Resource Head",  // Standardized naming
        "Resource and Finance Head"
      ],
    },
  },
  { timestamps: true }
);

const Actor = mongoose.models.Actor || mongoose.model("Actor", actorSchema);
<<<<<<< HEAD
export default Actor;
=======
export default Actor;
>>>>>>> 0843dfc8de6351e51fe10f1378eae429a33d62fb
