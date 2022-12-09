import { Model } from 'sequelize';
import { Sequelize } from './index';

export type FacultyAttributes = {
  id: number;
  name: string;
};

export type FacultyCreateAttributes = Partial<FacultyAttributes>;

export interface Faculty
  extends Model<FacultyAttributes, FacultyCreateAttributes>,
    FacultyAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Faculty = sequelize.define<Faculty>(
    'Faculty',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  //@ts-ignore TODO:
  // Faculty.associate = function (models: Models) {
  //   //@ts-ignore TODO:
  //   this.belongsToMany(models.Teacher, {
  //     through: 'TeachersFacultys',
  //     foreignKey: 'subjectId',
  //     otherKey: 'teacherId',
  //   });
  // };

  return Faculty;
};
