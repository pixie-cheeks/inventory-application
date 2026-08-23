import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface Trainer {
  id: number;
  trainer_name: string;
  trainer_description: string;
}

const trainersTable = new BaseTableModel<Trainer>(pool, 'types');

export { trainersTable };
