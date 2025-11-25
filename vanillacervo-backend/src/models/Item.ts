import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  genre: string;
  author: string;
  releaseYear: number;
  type: 'book' | 'album';
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  type: {
    type: String,
    enum: ['book', 'album'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IItem>('Item', ItemSchema);