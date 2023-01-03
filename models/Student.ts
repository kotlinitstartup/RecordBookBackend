import { Model } from 'sequelize';
import { Group } from './Group';
import { Models, Sequelize } from './index';

export type StudentAttributes = {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  groupId: number;
  recordBookId: number;
};

export type StudentCreateAttributes = Partial<StudentAttributes>;

export interface Student
  extends Model<StudentAttributes, StudentCreateAttributes>,
    StudentAttributes {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  groupId: number;
  recordBookId: number;

  group?: Group;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Student = sequelize.define<Student>(
    'Student',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      patronymic: {
        type: DataTypes.STRING,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recordBookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Students',
      modelName: 'Student',
    },
  );

  //@ts-ignore TODO:
  Student.associate = function (models: Models) {
    this.belongsTo(models.Group, {
      as: 'group',
      foreignKey: 'groupId',
    });

    this.hasMany(models.Exam, {
      as: 'exams',
      foreignKey: 'studentId',
    });

    this.hasMany(models.Credit, {
      as: 'credits',
      foreignKey: 'studentId',
    });

    this.belongsTo(models.RecordBook, {
      as: 'recordBook',
      foreignKey: 'recordBookId',
    });
  };

  return Student;
};
