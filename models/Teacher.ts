import {
  BelongsToManyGetAssociationsMixin,
  HasManyGetAssociationsMixin,
  Model,
} from 'sequelize';
import { Credit } from './Credit';
import { Exam } from './Exam';
import { Models, Sequelize } from './index';
import { Subject } from './Subject';

export type TeacherAttributes = {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TeacherCreateAttributes = Partial<TeacherAttributes>;

export interface Teacher
  extends Model<TeacherAttributes, TeacherCreateAttributes>,
    TeacherAttributes {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;

  getSubjects?: BelongsToManyGetAssociationsMixin<Subject>;

  getExams?: HasManyGetAssociationsMixin<Exam>;
  getCredits?: HasManyGetAssociationsMixin<Credit>;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Teacher = sequelize.define<Teacher>(
    'Teacher',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Teachers',
      modelName: 'Teacher',
    },
  );

  //@ts-ignore TODO:
  Teacher.associate = function (models: Models) {
    this.hasMany(models.Exam, {
      as: 'exams',
      foreignKey: 'teacherId',
    });

    this.hasMany(models.Credit, {
      as: 'credits',
      foreignKey: 'teacherId',
    });

    this.belongsToMany(models.Subject, {
      as: 'subjects',
      through: 'TeachersSubjects',
      foreignKey: 'teacherId',
      otherKey: 'subjectId',
    });
  };

  return Teacher;
};
