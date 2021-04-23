import Artist from "./Artists.js";

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
            references: {model: Artist, key: "artist_id"}
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
      { freezeTableName: true, timestamps: false }
    );
    return AlbumInfo;
  };