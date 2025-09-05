import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const tables = await queryInterface.showAllSchemas({});
    const has = (Array.isArray(tables) ? tables : []).some((s:any) => {
      const name = s.table_name || s.tbl_name || s.name || s.TABLE_NAME || s.toString();
      return String(name).toLowerCase() === "integrations";
    });

    if (!has) {
      await queryInterface.createTable("Integrations", {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        type: { type: DataTypes.ENUM("instagram", "messenger"), allowNull: false },
        pageId: { type: DataTypes.STRING, allowNull: true },
        igUserId: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        accessToken: { type: DataTypes.TEXT, allowNull: true },
        expiresAt: { type: DataTypes.DATE, allowNull: true },
        data: { type: DataTypes.JSON, allowNull: true },
        isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
      });
      await queryInterface.addIndex("Integrations", ["type", "pageId"], { unique: false, name: "idx_integrations_type_page" });
    } else {
      // add columns if missing
      const cols:any = await queryInterface.describeTable("Integrations");
      const ensure = async (name:string, def:any) => {
        if (!cols[name]) await queryInterface.addColumn("Integrations", name, def);
      };
      await ensure("type", { type: DataTypes.ENUM("instagram","messenger"), allowNull: false, defaultValue: "messenger" });
      await ensure("pageId", { type: DataTypes.STRING, allowNull: true });
      await ensure("igUserId", { type: DataTypes.STRING, allowNull: true });
      await ensure("name", { type: DataTypes.STRING, allowNull: true });
      await ensure("accessToken", { type: DataTypes.TEXT, allowNull: true });
      await ensure("expiresAt", { type: DataTypes.DATE, allowNull: true });
      await ensure("data", { type: DataTypes.JSON, allowNull: true });
      await ensure("isActive", { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    // noop
  }
};
