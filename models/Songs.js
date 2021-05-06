export default (sequelize, DataTypes) => {
    const Songs = sequelize.define(
      'Songs',
      {
        song_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true
        },
        artist_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: false
        },
        album_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: false
        },
        genre_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: false
        },
        song_name: {
          type: DataTypes.STRING,
          
        },
        song_duration: {
          type: DataTypes.STRING,
          
        }
      },
      { tableName: "songs", freezeTableName: true, timestamps: false }
    );
    return Songs;
};