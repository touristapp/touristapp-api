import Sequelize, { Model } from "sequelize";

export default class Travel extends Model {
    static init(database){

        return super.init({

            departure: {
                type: Sequelize.STRING,
            },

            destination: {
                type: Sequelize.STRING,
            },

            carbonFootprint: {
                type: Sequelize.NUMERIC
            },

            distance: {
                type: Sequelize.INTEGER,
            },

            duration: {
                type: Sequelize.INTEGER,
            },

            done: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
            tableName: "travel",
            sequelize: database,
        })
    };
}
