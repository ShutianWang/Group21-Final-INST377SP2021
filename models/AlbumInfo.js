export default (sequelize, DataTypes) => {
    const AlbumInfo = sequelize.define(
      'AlbumInfo',
      {
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        album_name: {
            type: DataTypes.STRING
        },
        album_type: {
            type : DataTypes.STRING
        },
        album_release_date: {
            type: DataTypes.DATE
        }
      },
      { tableName: "album_info", freezeTableName: true, timestamps: false }
    );
    return AlbumInfo;
  };