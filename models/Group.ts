import { Model } from 'sequelize';
import { Sequelize } from './index';

export type GroupAttributes = {
  id: number;
  name: string;
  specialityId: number;
};

export type GroupCreateAttributes = Partial<GroupAttributes>;

export interface Group
  extends Model<GroupAttributes, GroupCreateAttributes>,
    GroupAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Group = sequelize.define<Group>(
    'Group',
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
      specialityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Groups',
      modelName: 'Group',
    },
  );

  //@ts-ignore
  Group.associate = function (models: Models) {
    this.belongsTo(models.Speciality, {
      as: 'speciality',
      foreignKey: 'specialityId',
    });

    this.hasMany(models.Student, {
      as: 'students',
      foreignKey: 'groupId',
    });
  };

  return Group;
};
