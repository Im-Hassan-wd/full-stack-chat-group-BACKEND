const express = require("express");
const {
  create_group_post,
  all_groups_get,
  group_get,
  group_delete,
  update_group_patch,
} = require("../controllers/groupController");
const requireAuth = require("../middleware/requireauth");

// require auth
const router = express.Router();

router.use(requireAuth);

// GET all groups
router.get("/", all_groups_get);

// GET a single group
router.get("/:id", group_get);

// CREATE a new group
router.post("/", create_group_post);

// DELETE a group
router.delete("/:id", group_delete);

// UPDATE a group
router.patch("/:id", update_group_patch);

module.exports = router;
