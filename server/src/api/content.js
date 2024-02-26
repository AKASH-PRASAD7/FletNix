import { Router } from "express";
const router = Router();
import {
  getContent,
  searchContent,
  getContentById,
  getContentByType,
} from "../controller/content.js";
import verifyCookie from "../middleware/verifyCookie.js";
import isAdult from "../middleware/isAdult.js";

/**
 * Route     /api/content/?page=1&limit=15
 * Des       Get all content(movies/shows) paginated
 * Params    none
 * Access    Private
 * Method    GET
 */

router.get("/", verifyCookie, isAdult, async (req, res) =>
  getContent(req, res)
);

/**
 * Route     /api/content/search/?query=Avengers
 * Des       search content by title or cast
 * Params    none
 * Access    Private
 * Method    GET
 */

router.get("/search", verifyCookie, isAdult, async (req, res) =>
  searchContent(req, res)
);

/**
 * Route     /api/content/type/?type=movie&page=1&limit=15
 * Des       Get Content by type (movies/shows)
 * Params    type, page, limit
 * Access    Private
 * Method    GET
 */

router.get("/type", verifyCookie, isAdult, async (req, res) => {
  getContentByType(req, res);
});

/**
 * Route     /api/content/:showId
 * Des       Get Content by id
 * Params    none
 * Access    Private
 * Method    GET
 */

router.get("/:showId", verifyCookie, isAdult, async (req, res) => {
  getContentById(req, res);
});

router.get("*", (req, res) => {
  try {
    res.status(404).json({ message: "Route doesn't exist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
