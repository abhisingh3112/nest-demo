import { Repository } from 'sequelize-typescript';
import { CreateOptions, FindOptions, Model, UpdateOptions } from 'sequelize';

export class BaseRepository<T extends Model> {
  protected context: Repository<T>;
  // update underline model by id.
  updateById(id: number, values: Partial<T>) {
    return this.update(values, { where: { id } });
  }
  // update underline model
  update(values: Partial<T>, options: UpdateOptions) {
    return this.context.update(values, options);
  }
  // fetch underline model.
  findAll(options: FindOptions) {
    return this.context.findAll(options);
  }
  findOne(options: FindOptions) {
    return this.context.findOne(options);
  }
  create(values: any, options?: CreateOptions) {
    return this.context.create(values, options);
  }

  upsert(values: any, options?: CreateOptions) {
    return this.context.upsert(values, options);
  }

  findById(id: number) {
    return this.findOne({where: {id: id}});
  }
}
