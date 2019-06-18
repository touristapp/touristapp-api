import Sequelize from 'sequelize';

export default class Travel extends Model {
    static init(database){

        return super.init({

            deparature: {
                type: Sequelize.STRING,
            },

            destination: {
                type: Sequelize.STRING,
            },

            carbonFootprint: {
                type: Sequelize.FLOAT(10, 2)
            },
            
            distance: {
                type: Sequelize.INTEGER,
            },

            duration: {
                type: Sequelize.INTEGER,
            },

            done: {
                type: Sequelize.BOOLEAN,
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