import express from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, description, genre, author, releaseYear, type } = req.body;
    
    const newItem = new Item({
      title,
      description,
      genre,
      author,
      releaseYear,
      type
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, description, genre, author, releaseYear, type } = req.body;
    
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        genre,
        author,
        releaseYear,
        type
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

export default router;