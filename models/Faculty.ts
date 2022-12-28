import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

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
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'Faculties',
      modelName: 'Faculty',
    },
  );

  //@ts-ignore TODO:
  Faculty.associate = function (models: Models) {
    this.hasMany(models.Speciality, {
      as: 'specialities',
      foreignKey: 'facultyId',
    });
  };

  return Faculty;
};
