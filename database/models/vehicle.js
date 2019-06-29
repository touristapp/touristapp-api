import Sequelize, { Model } from "sequelize";

export default class Vehicle extends Model {
  static init(database) {

    return super.init(
      {
        conso: {
          type: Sequelize.NUMERIC,
        },
        createdAt: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
        updatedAt: {
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
        }
      }, {
        tableName: "vehicle",
        sequelize: database,
      })
  };
}
