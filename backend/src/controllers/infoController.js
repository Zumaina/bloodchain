import Info from "../models/Info.js";

// GET all info cards
export const getInfos = async (req, res, next) => {
  try {
    const infos = await Info.find().sort({ title: 1 }); // optional: alphabetical
    res.status(200).json(infos);
  } catch (error) {
    next(error);
  }
};

// GET info by slug
export const getInfoBySlug = async (req, res, next) => {
  try {
    const info = await Info.findOne({ slug: req.params.slug });
    if (!info) return res.status(404).json({ message: "Info not found" });
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

// Optional: POST info (for admin use)
export const createInfo = async (req, res, next) => {
  try {
    const { title, slug, content } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInfo = await Info.create({ title, slug, content });
    res.status(201).json(newInfo);
  } catch (error) {
    next(error);
  }
};
