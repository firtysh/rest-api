import { Router } from 'express';
import {
  getUser, createUser, getUsers, updateUser, deleteUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
