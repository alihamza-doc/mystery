import Location from "../models/Location.js";

export const saveLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    // Save to MongoDB
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();

    console.log("Location saved:", newLocation);

    res.status(200).json({ status: "success", saved: newLocation });
  } catch (err) {
    console.error("Error saving location:", err);
    res.status(500).json({ status: "error", message: "Could not save location" });
  }
};
