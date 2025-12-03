import pool from '../config/database';
import { RowDataPacket, FieldPacket, ResultSetHeader } from "mysql2/promise";

export interface Item {
  id?: number;
  title: string;
  author?: string;
  artist?: string;
  type: 'book' | 'cd';
  category_id?: number;
  year?: number;
  rating?: number;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class ItemModel {

  static async findAll(): Promise<Item[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM items ORDER BY created_at DESC'
    );
    return rows as Item[];
  }

  static async findById(id: number): Promise<Item | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM items WHERE id = ?',
      [id]
    );

    return rows.length > 0 ? (rows[0] as Item) : null;
  }

  static async create(item: Item): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO items (title, author, artist, type, category_id, year, rating, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        item.title,
        item.author || null,
        item.artist || null,
        item.type,
        item.category_id || null,
        item.year || null,
        item.rating || null,
        item.notes || null,
      ]
    );

    return result.insertId;
  }

  static async update(id: number, item: Partial<Item>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(item).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    values.push(id);

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE items SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM items WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  static async findByType(type: 'book' | 'cd'): Promise<Item[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM items WHERE type = ? ORDER BY created_at DESC',
      [type]
    );

    return rows as Item[];
  }
}
