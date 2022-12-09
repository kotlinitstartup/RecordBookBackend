import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type SpecialityAttributes = {
  id: number;
  name: string;
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
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    },
  );

  //@ts-ignore TODO:
  Speciality.associate = function (models: Models) {
    //@ts-ignore TODO:
    this.hasMany(models.Student, {
      as: 'students',
      foreignKey: 'specialityId',
    });
  };

  return Speciality;
};
