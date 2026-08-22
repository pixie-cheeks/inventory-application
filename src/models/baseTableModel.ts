import type { Client } from 'pg';

interface BaseRowType {
  id: number;
}

class BaseTableModel<RowType extends BaseRowType> {
  pool: Client;
  tableName: string;

  constructor(pool: Client, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async getAllRows(): Promise<RowType[]> {
    const { rows } = await this.pool.query<RowType>(
      `SELECT * FROM ${this.tableName};`,
    );
    return rows;
  }

  async getRowById(id: number): Promise<RowType | undefined> {
    const { rows } = await this.pool.query<RowType>(
      `SELECT * FROM ${this.tableName} WHERE id = $1;`,
      [id],
    );
    return rows.at(0);
  }

  async insertRow(rowData: Omit<RowType, 'id'>): Promise<RowType | undefined> {
    const rowColumnsClause = Object.keys(rowData).join(', ');
    const rowValues = Object.values(rowData);
    const rowValuesClause = rowValues
      .map((_value, index) => `$${index + 1}`)
      .join(', ');

    const { rows } = await this.pool.query<RowType>(
      `INSERT INTO ${this.tableName} (${rowColumnsClause}) VALUES (${rowValuesClause});`,
      rowValues,
    );

    return rows.at(0);
  }

  async editRowById(
    id: number,
    rowData: Partial<Omit<RowType, 'id'>>,
  ): Promise<RowType | undefined> {
    const generatedSetClause = Object.keys(rowData)
      .map((columnName, index) => `${columnName} = $${index + 2}`)
      .join(', ');

    const { rows } = await this.pool.query<RowType>(
      `UPDATE ${this.tableName} SET ${generatedSetClause} WHERE id = $1;`,
      [id, ...Object.values(rowData)],
    );

    return rows.at(0);
  }

  async deleteRowById(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = $1;`, [id]);
  }

  async deleteAllRows(): Promise<void> {
    await this.pool.query(`DELETE FROM ${this.tableName};`);
  }
}

export { BaseTableModel };
