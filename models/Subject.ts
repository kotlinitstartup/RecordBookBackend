import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type SubjectAttributes = {
  id: number;
  name: string;
};

export type SubjectCreateAttributes = Partial<SubjectAttributes>;

export interface Subject
  extends Model<SubjectAttributes, SubjectCreateAttributes>,
    SubjectAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Subject = sequelize.define<Subject>(
    'Subject',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'Subjects',
      modelName: 'Subject',
    },
  );

  //@ts-ignore TODO:
  Subject.associate = function (models: Models) {
    this.belongsToMany(models.Teacher, {
      through: 'TeachersSubjects',
      foreignKey: 'subjectId',
      as: 'teachers',
    });

    this.hasMany(models.Exam, {
      as: 'exams',
      foreignKey: 'subjectId',
    });

    this.hasMany(models.Credit, {
      as: 'credits',
      foreignKey: 'subjectId',
    });
  };

  return Subject;
};
