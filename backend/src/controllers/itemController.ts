import { Request, Response } from 'express';
import { ItemModel, Item } from '../models/Itens';

export class ItemController {
  static async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemModel.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar itens' });
    }
  }

  static async getItemById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const item = await ItemModel.findById(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar item' });
    }
  }

  static async getItemsByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      if (type !== 'book' && type !== 'cd') {
        return res.status(400).json({ error: 'Tipo inválido' });
      }
      
      const items = await ItemModel.findByType(type);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar itens' });
    }
  }

  static async createItem(req: Request, res: Response) {
    try {
      const item: Item = req.body;
      const id = await ItemModel.create(item);
      res.status(201).json({ id, ...item });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar item' });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updates: Partial<Item> = req.body;
      
      const success = await ItemModel.update(id, updates);
      
      if (!success) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      
      res.json({ message: 'Item atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  }

  static async deleteItem(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await ItemModel.delete(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      
      res.json({ message: 'Item deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar item' });
    }
  }
}