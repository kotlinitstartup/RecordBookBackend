import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type StudentAttributes = {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
  groupId: number;
  specialityId: number;
  facultyId: number;
};

export type StudentCreateAttributes = Partial<StudentAttributes>;

export interface Student
  extends Model<StudentAttributes, StudentCreateAttributes>,
    StudentAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Student = sequelize.define<Student>(
    'Student',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
      specialityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      facultyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  //@ts-ignore TODO:
  Student.associate = function (models: Models) {
    //@ts-ignore TODO:
    this.belongsTo(models.Speciality, {
      as: 'speciality',
      foreignKey: 'specialityId',
    });
  };

  return Student;
};
