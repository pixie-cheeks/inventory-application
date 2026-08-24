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

class TrainerTableModel extends BaseTableModel<Trainer> {
  constructor() {
    super(pool, 'trainers');
  }

  async getTrainerByName(trainer_name: string): Promise<Trainer | undefined> {
    const { rows } = await this.pool.query<Trainer>(
      /* sql */ `
        SELECT
          *
        FROM
          ${this.tableName}
        WHERE
          trainer_name = $1;
      `,
      [trainer_name],
    );

    return rows.at(0);
  }
}

const trainersTable = new TrainerTableModel();

export { trainersTable };
export type { Trainer, InsertionTrainer };
