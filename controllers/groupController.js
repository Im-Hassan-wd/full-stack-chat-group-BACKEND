const Group = require("../models/groupModels");
const mongoose = require("mongoose");

// get all groups
const all_groups_get = async (req, res) => {
  const user_id = req.user._id;

  const groups = await Group.find({ user_id }).sort({ createdAt: 1 });

  res.status(200).json(groups);
};

// get a single group
const group_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }
  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: "No such group" });
  }

  res.status(200).json(group);
};

// create new group
const create_group_post = async (req, res) => {
  const { name, description, members, chats } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the missing field(s)", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const group = await Group.create({
      name,
      description,
      members,
      chats,
      user_id,
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ messg: "CREATE a new group" });
};

// delete a group
const group_delete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  const group = await Group.findOneAndDelete({ _id: id });

  if (!group) {
    return res.status(404).json({ error: "No such group" });
  }

  res.status(200).json(group);
};

// update a group
const update_group_patch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such group" });
  }

  const group = await Group.findOneAndUpdate({ _id: id }, req.body);

  if (!group) {
    return res.status(404).json({ error: "No such group" });
  }

  res.status(200).json(group);
};

module.exports = {
  create_group_post,
  all_groups_get,
  group_get,
  group_delete,
  update_group_patch,
};
