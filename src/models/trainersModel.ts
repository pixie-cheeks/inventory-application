import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface InsertionTrainer {
  trainer_name: string;
  trainer_description: string;
  image_src?: string;
}

type Trainer = {
  id: number;
} & InsertionTrainer;

const trainersTable = new BaseTableModel<Trainer>(pool, 'trainers');

export { trainersTable };
export type { Trainer, InsertionTrainer };
