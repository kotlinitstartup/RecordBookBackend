import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type SpecialityAttributes = {
  id: number;
  name: string;
  facultyId: number;
};

export type SpecialityCreateAttributes = Partial<SpecialityAttributes>;

export interface Speciality
  extends Model<SpecialityAttributes, SpecialityCreateAttributes>,
    SpecialityAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Speciality = sequelize.define<Speciality>(
    'Speciality',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      facultyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Specialities',
      modelName: 'Speciality',
    },
  );

  //@ts-ignore TODO:
  Speciality.associate = function (models: Models) {
    this.belongsTo(models.Faculty, {
      as: 'faculty',
      foreignKey: 'facultyId',
    });

    this.hasMany(models.Group, {
      as: 'groups',
      foreignKey: 'specialityId',
    });
  };

  return Speciality;
};
