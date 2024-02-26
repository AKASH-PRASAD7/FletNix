import Content from "../model/content.js";
import getContentQuery from "../helper/getContentQuery.js";

/** Get All Content */

export const getContent = async (req, res) => {
  try {
    const { adult } = req.body;
    const { page, limit } = req.query;
    if (!page || !limit) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide page and limit" });
    }
    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Content.countDocuments({});
    let contents = [];
    if (adult) {
      contents = await Content.find().limit(Number(limit)).skip(startIndex);
    } else {
      contents = await Content.find({ rating: { $ne: "R" } })
        .limit(Number(limit))
        .skip(startIndex);
    }

    if (!contents) {
      return res
        .status(400)
        .json({ success: false, message: "Content not found" });
    }
    return res.status(200).json({
      success: true,
      adult,
      totalPages: Math.ceil(total / +limit),
      currentPage: +page,
      contents,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* Search Content */

export const searchContent = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide search query" });
    }
    const searchContent = await Content.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { cast: { $regex: query, $options: "i" } },
      ],
    });
    if (searchContent.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }
    return res.status(200).json({ success: true, searchContent });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* Get Content By Id */
export const getContentById = async (req, res) => {
  try {
    const { showId } = req.params;
    if (!showId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide content id" });
    }
    const content = await Content.find({ show_id: showId });
    if (content.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Content not found" });
    }
    return res.status(200).json({ success: true, content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* Get Content By Type */

export const getContentByType = async (req, res) => {
  try {
    const { adult } = req.body;
    const { type, page, limit } = req.query;
    console.log(type, page, limit);

    if (!type || !page || !limit) {
      return res.status(400).json({
        success: false,
        message: "Please provide content type, page, and limit",
      });
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    let content = [];

    if (type === "movie") {
      content = await getContentQuery(
        "Movie",
        startIndex,
        limit,
        adult,
        Content
      );
    } else if (type === "show") {
      content = await getContentQuery(
        "TV Show",
        startIndex,
        limit,
        adult,
        Content
      );
    }

    if (content.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    return res.status(200).json({
      success: true,
      adult,
      totalPages: Math.ceil(content.total / +limit),
      currentPage: +page,
      content: content.results,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
