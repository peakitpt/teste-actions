import { TableDataSource } from '@peakitpt/ui-material';
import { VisibleField } from './visible-field';

export class TableField extends VisibleField {
  type: string = 'table';
  dataSource: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumns: any[] = [];

  public constructor(init?:Partial<TableField>) {
    super();
    Object.assign(this, init);
  }
}