import { Model, Optional } from 'sequelize';
import { Models, Sequelize } from './index';

export type TeacherAttributes = {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  email: string;
  password: string;
};

export type TeacherCreateAttributes = Optional<TeacherAttributes, 'id'>;

export interface Teacher
  extends Model<TeacherAttributes, TeacherCreateAttributes>,
    TeacherAttributes {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  email: string;
  password: string;
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
      timestamps: false,
    },
  );

  //@ts-ignore TODO:
  Teacher.associate = function (models: Models) {
    //@ts-ignore TODO:
    this.belongsToMany(models.Subject, {
      through: 'TeachersSubjects',
      foreignKey: 'teacherId',
      otherKey: 'subjectId',
    });
  };

  return Teacher;
};
