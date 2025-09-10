import Info from "../models/Info.js";


export const getInfos = async (req, res, next) => {
  try {
    const infos = await Info.find().sort({ title: 1 }); 
    res.status(200).json(infos);
  } catch (error) {
    next(error);
  }
};


export const getInfoBySlug = async (req, res, next) => {
  try {
    const info = await Info.findOne({ slug: req.params.slug });
    if (!info) return res.status(404).json({ message: "Info not found" });
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};


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
