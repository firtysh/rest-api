import { v4 as uuidv4, validate } from 'uuid';

const getUsers = async (req, res) => {
  try {
    const UserData = req.app.get('UserData');
    const users = Object.values(UserData);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const UserData = req.app.get('UserData');
    const { username, age, hobbies } = req.body;
    if (!username || !age || !hobbies) {
      return res.status(400).json({ error: 'Please provide complete details' });
    }
    const id = uuidv4();
    const user = {
      id,
      username,
      age,
      hobbies,
    };
    UserData[id] = user;
    if (process.env.MULTIPLE_INSTANCES === 'true') {
      process.send({ type: 'updateUserData', data: UserData });
    }
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const UserData = req.app.get('UserData');
    const { id } = req.params;
    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = UserData[id];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const UserData = req.app.get('UserData');
    const { id } = req.params;
    const { username, age, hobbies } = req.body;
    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = UserData[id];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (username) {
      user.username = username;
    }
    if (age) {
      user.age = age;
    }
    if (hobbies) {
      user.hobbies = hobbies;
    }
    if (process.env.MULTIPLE_INSTANCES === 'true') {
      process.send({ type: 'updateUserData', data: UserData });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const UserData = req.app.get('UserData');
    const { id } = req.params;
    if (!validate(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = UserData[id];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    delete UserData[id];
    if (process.env.MULTIPLE_INSTANCES === 'true') {
      process.send({ type: 'updateUserData', data: UserData });
    }
    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export {
  getUser, createUser, getUsers, updateUser, deleteUser,
};
