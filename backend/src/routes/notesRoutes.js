import express from 'express';
import { getAllNotes } from '../controllers/notesController.js';
import { createANote } from '../controllers/notesController.js';
import { updateANote } from '../controllers/notesController.js';
import { deleteANote } from '../controllers/notesController.js';
import { getNotebyId } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);

router.get('/:id', getNotebyId);

router.post('/', createANote);

router.put('/:id', updateANote);

router.delete('/:id', deleteANote);

export default router;
