export default (sequelize, DataTypes) => {
    const Artists = sequelize.define(
      'Artists',
      {
        artist_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true
        },
        label_id: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        artist_name: {
          type: DataTypes.STRING
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return Artists;
  };