import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro:', error.message);
  console.error('Stack:', error.stack);

  if (error.message.includes('ER_DUP_ENTRY')) {
    return res.status(400).json({ 
      error: 'Registro duplicado. Este item já existe.' 
    });
  }

  if (error.message.includes('ER_NO_REFERENCED_ROW')) {
    return res.status(400).json({ 
      error: 'Referência inválida. Categoria não encontrada.' 
    });
  }

  if (error.message.includes('ER_DATA_TOO_LONG')) {
    return res.status(400).json({ 
      error: 'Dados muito longos para o campo.' 
    });
  }

  if (error.message.includes('Não é possível deletar uma categoria')) {
    return res.status(400).json({ 
      error: error.message 
    });
  }

  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};