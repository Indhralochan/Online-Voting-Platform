'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question.belongsTo(models.election, {
        foreignKey: "electionID",
      });
      question.hasMany(models.options, {
        foreignKey: "questionId",
      });
      question.hasMany(models.Answers, {
        foreignKey: "questionID",
      });
    }
    static async getNumberOfQuestions(electionID) {
      return await this.count({
        where: {
          electionID,
        },
      });
    }
  }
  question.init({
    elecQuestion: DataTypes.STRING,
    elecDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};