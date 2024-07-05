const Group = require('../models/Group');
const User = require('../models/User');

const createGroup = async (req, res) => {
  try {
    const { class: className, period, discipline, githubRepo, googleDocsLink } = req.body;
    const newGroup = new Group({ class: className, period, discipline, githubRepo, googleDocsLink });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const group = await Group.findById(groupId);
    const user = await User.findById(userId);
    if (!group || !user) {
      return res.status(404).json({ message: 'Group or User not found' });
    }
    group.members.push(user);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to group', error });
  }
};

module.exports = { createGroup, getGroups, addUserToGroup };
