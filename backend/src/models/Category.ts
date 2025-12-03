import pool from '../config/database';

export interface Category {
  id?: number;
  name: string;
  color: string;
  created_at?: Date;
}

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    return rows as Category[];
  }

  static async create(category: Category): Promise<number> {
    const [result] = await pool.execute(
      'INSERT INTO categories (name, color) VALUES (?, ?)',
      [category.name, category.color]
    );
    return (result as any).insertId;
  }
}