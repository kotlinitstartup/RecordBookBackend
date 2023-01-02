import { Model } from 'sequelize';
import { Models, Sequelize } from './index';

export type RecordBookAttributes = {
  id: number;
  number: string;
  studentId: number;
};

export type RecordBookCreateAttributes = Partial<RecordBookAttributes>;

export interface RecordBook
  extends Model<RecordBookAttributes, RecordBookCreateAttributes>,
    RecordBookAttributes {}

export default (sequelize: Sequelize, DataTypes: any) => {
  const RecordBook = sequelize.define<RecordBook>(
    'RecordBook',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'RecordBooks',
      modelName: 'RecordBook',
    },
  );

  //@ts-ignore TODO:
  RecordBook.associate = function (models: Models) {
    this.belongsTo(models.Student, {
      as: 'student',
    });
  };

  return RecordBook;
};
