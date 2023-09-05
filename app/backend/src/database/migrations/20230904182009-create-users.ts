import { Model, QueryInterface, DataTypes } from 'sequelize';
 import IUsers from '../../Interfaces/IUsers';

 export default {
   up(queryInterface: QueryInterface) {
     return queryInterface.createTable<Model<IUsers>>('users', {

       id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
       },

       username: {
         type: DataTypes.STRING,
       },

       role: {
         type: DataTypes.STRING,
       },

       email: {
         type: DataTypes.STRING,
       },

       password: {
         type: DataTypes.STRING,
       },
       
     });
   },

   down(queryInterface: QueryInterface) {
     return queryInterface.dropTable('users');
   },
 }; 
