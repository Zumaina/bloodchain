import BloodRequest from "../models/BloodRequest.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get all NON-fulfilled requests (public)
export const getAllRequests = asyncHandler(async (req, res) => {
  const requests = await BloodRequest.find({ isFulfilled: false })
    .sort({ createdAt: -1 })
    .populate('user', 'name email phone'); // Populate user info for frontend checks
  res.status(200).json(requests);
});

// Create a new request (protected)
export const createRequest = asyncHandler(async (req, res) => {
  const { name, age, gender, bloodGroup, bags, date, time, place } = req.body;

  if (!name || !age || !gender || !bloodGroup || !bags || !date || !time || !place) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newRequest = await BloodRequest.create({
    user: req.user.id,
    name,
    age,
    gender,
    bloodGroup,
    bags,
    date,
    time,
    place,
  });

  // Populate user data in the response
  await newRequest.populate('user', 'name email');
  res.status(201).json(newRequest);
});

// Mark as fulfilled (protected, only creator)
export const markFulfilled = asyncHandler(async (req, res) => {
  const request = await BloodRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Request not found");
  }

  // Check if the logged-in user is the one who created the request
  if (request.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to mark this request as fulfilled");
  }

  request.isFulfilled = true;
  await request.save();
  
  res.status(200).json({ message: "Request marked as fulfilled" });
});