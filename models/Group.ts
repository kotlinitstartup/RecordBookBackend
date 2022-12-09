import { Model } from 'sequelize';
import { Sequelize } from './index';

export type GroupAttributes = {
  id: number;
  name: string;
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
  // Group.associate = function (models: Models) {
  //   //@ts-ignore TODO:
  //   this.belongsToMany(models.Teacher, {
  //     through: 'TeachersGroups',
  //     foreignKey: 'subjectId',
  //     otherKey: 'teacherId',
  //   });
  // };

  return Group;
};
