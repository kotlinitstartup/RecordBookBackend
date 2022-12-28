import { DataTypes as DataTypesType, Model, Optional } from 'sequelize';
import { Models, Sequelize } from './index';
import { Semester } from './Semester';
import { Student } from './Student';

export type CreditAttributes = {
  id: number;
  statusId: number;
  teacherId: number;
  studentId: number;
  subjectId: number;
  semesterId: number;
};

export type CreditCreateAttributes = Optional<CreditAttributes, 'id'>;

export interface Credit
  extends Model<CreditAttributes, CreditCreateAttributes>,
    CreditAttributes {
  id: number;
  statusId: number;
  teacherId: number;
  studentId: number;
  subjectId: number;
  semesterId: number;
  createdAt: Date;
  updatedAt: Date;

  semester?: Semester;
  student?: Student;
}

export default (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  const Credit = sequelize.define<Credit>(
    'Credit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      semesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Credits',
      modelName: 'Credit',
    },
  );

  //@ts-ignore TODO:
  Credit.associate = function (models: Models) {
    Credit.belongsTo(models.CreditStatuses, {
      as: 'status',
      foreignKey: 'statusId',
    });

    Credit.belongsTo(models.Teacher, {
      as: 'teacher',
      foreignKey: 'teacherId',
    });

    Credit.belongsTo(models.Student, {
      as: 'student',
      foreignKey: 'studentId',
    });

    Credit.hasOne(models.Subject, {
      as: 'subject',
      foreignKey: 'subjectId',
    });

    Credit.hasOne(models.Semester, {
      as: 'semester',
      foreignKey: 'semesterId',
    });
  };

  return Credit;
};
