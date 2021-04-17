export default (sequelize, DataTypes) => {
    const Charting = sequelize.define(
      'Charting',
      {
        charting_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        song_id: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {model: Songs, key: "song_id"}
        },
        peak_on_chart: {
            type: DataTypes.INTEGER
        },
        weeks_on_chart: {
            type: DataTypes.INTEGER
        },
        latest_position: {
            type: DataTypes.INTEGER
        },
        last_week_on_chart: {
            type: DataTypes.DATE
        }
      },
      { freezeTableName: true, timestamps: false }
    );
    return Charting;
  };
  