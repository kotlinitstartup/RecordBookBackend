import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type SemesterAttributes = {
  id: number;
  name: string;
};

export type SemesterCreateAttributes = Partial<SemesterAttributes>;

export interface Semester
  extends Model<SemesterAttributes, SemesterCreateAttributes>,
    SemesterAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const Semester = sequelize.define<Semester>(
    'Semester',
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
      timestamps: false,
      tableName: 'Semesters',
      modelName: 'Semester',
    },
  );

  //@ts-ignore TODO:
  Semester.associate = function (models: Models) {
    this.belongsTo(models.Exam, {
      foreignKey: 'semesterId',
    });

    this.belongsTo(models.Credit, {
      foreignKey: 'semesterId',
    });
  };

  return Semester;
};
