import { DataTypes as DataTypesType, Model, Optional } from 'sequelize';
import { Models, Sequelize } from './index';

export type CreditStatusesAttributes = {
  id: number;
  alias: string;
};

export type CreditStatusesCreateAttributes = Optional<
  CreditStatusesAttributes,
  'id'
>;

export interface CreditStatuses
  extends Model<CreditStatusesAttributes, CreditStatusesCreateAttributes>,
    CreditStatusesAttributes {
  id: number;
  alias: string;
}

export default (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  const CreditStatuses = sequelize.define<CreditStatuses>(
    'CreditStatuses',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      alias: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: 'CreditStatuses',
      modelName: 'CreditStatus',
      timestamps: false,
    },
  );

  //@ts-ignore TODO:
  CreditStatuses.associate = function (models: Models) {
    CreditStatuses.hasMany(models.Credit, {
      as: 'credits',
      foreignKey: 'statusId',
    });
  };

  return CreditStatuses;
};
