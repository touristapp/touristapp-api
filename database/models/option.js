import Sequelize, { Model } from "sequelize";

export default class Option extends Model {
  static init(database) {

    return super.init(
      {
        name: {
          type: Sequelize.STRING,
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
        tableName: "option",
        sequelize: database,
      })
  };
}