import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface IntegrationAttributes {
  id: number;
  type: "instagram" | "messenger";
  pageId: string | null;
  igUserId: string | null;
  name: string | null;
  accessToken: string | null;
  expiresAt: Date | null;
  data: any | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type IntegrationCreation = Omit<IntegrationAttributes, "id"|"createdAt"|"updatedAt">;

class Integration extends Model<IntegrationAttributes, IntegrationCreation> implements IntegrationAttributes {
  public id!: number;
  public type!: "instagram" | "messenger";
  public pageId!: string | null;
  public igUserId!: string | null;
  public name!: string | null;
  public accessToken!: string | null;
  public expiresAt!: Date | null;
  public data!: any | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Integration.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM("instagram", "messenger"), allowNull: false },
    pageId: { type: DataTypes.STRING, allowNull: true },
    igUserId: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    accessToken: { type: DataTypes.TEXT, allowNull: true },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
    data: { type: DataTypes.JSON, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  { tableName: "Integrations", sequelize }
);

export default Integration;
