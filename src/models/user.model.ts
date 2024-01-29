import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
  paranoid: false,
  timestamps: true,
})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({unique:true})
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phoneNumber: number;
}