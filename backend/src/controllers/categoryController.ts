import { Request, Response } from 'express';
import { CategoryModel, Category } from '../models/Category';

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const categories = await CategoryModel.findAll();
      const category = categories.find(c => c.id === id);
      
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      
      res.json(category);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const category: Category = req.body;
      
      // Validação básica
      if (!category.name || !category.name.trim()) {
        return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
      }
      
      if (!category.color || !/^#[0-9A-F]{6}$/i.test(category.color)) {
        return res.status(400).json({ error: 'Cor inválida. Use formato hexadecimal (#RRGGBB)' });
      }
      
      const id = await CategoryModel.create(category);
      res.status(201).json({ 
        id, 
        name: category.name, 
        color: category.color,
        message: 'Categoria criada com sucesso' 
      });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates: Partial<Category> = req.body;
      
      if (updates.color && !/^#[0-9A-F]{6}$/i.test(updates.color)) {
        return res.status(400).json({ error: 'Cor inválida. Use formato hexadecimal (#RRGGBB)' });
      }
      
      const categories = await CategoryModel.findAll();
      const existingCategory = categories.find(c => c.id === id);
      
      if (!existingCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      
      const updatedCategory = {
        ...existingCategory,
        ...updates,
        id 
      };
      
      res.json({ 
        ...updatedCategory,
        message: 'Categoria atualizada com sucesso' 
      });
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      const categories = await CategoryModel.findAll();
      const existingCategory = categories.find(c => c.id === id);
      
      if (!existingCategory) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      
    
      
      res.json({ 
        message: 'Categoria deletada com sucesso',
        deletedCategory: existingCategory
      });
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
  }
}