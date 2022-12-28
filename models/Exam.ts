import { DataTypes as DataTypesType, Model, Optional } from 'sequelize';
import { Models, Sequelize } from './index';
import { Semester } from './Semester';
import { Student } from './Student';

export type ExamAttributes = {
  id: number;
  mark: number;
  teacherId: number;
  studentId: number;
  subjectId: number;
  semesterId: number;
};

export type ExamCreateAttributes = Optional<ExamAttributes, 'id'>;

export interface Exam
  extends Model<ExamAttributes, ExamCreateAttributes>,
    ExamAttributes {
  id: number;
  mark: number;
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
  const Exam = sequelize.define<Exam>(
    'Exam',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mark: {
        type: DataTypes.SMALLINT,
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
      tableName: 'Exams',
      modelName: 'Exam',
    },
  );

  //@ts-ignore TODO:
  Exam.associate = function (models: Models) {
    Exam.belongsTo(models.Teacher, {
      as: 'teacher',
      foreignKey: 'teacherId',
    });

    Exam.belongsTo(models.Student, {
      as: 'student',
      foreignKey: 'studentId',
    });

    Exam.belongsTo(models.Subject, {
      as: 'subject',
      foreignKey: 'subjectId',
    });

    Exam.hasOne(models.Semester, {
      as: 'semester',
      foreignKey: 'semesterId',
    });
  };

  return Exam;
};
