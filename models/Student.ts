import { Model } from "sequelize";
import { Sequelize } from "./index";

export type StudentAttributes = {
  id: number;
  firstname: string;
  lastname: boolean;
  patronymic: string;
};

export type StudentCreateAttributes = Partial<StudentAttributes>;

export interface Student
  extends Model<StudentAttributes, StudentCreateAttributes>,
    StudentAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Student = sequelize.define<Student>(
    "Student",
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
    },
    {
      timestamps: false,
    }
  );
  return Student;
};
