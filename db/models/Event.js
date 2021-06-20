module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING(20),

        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notContains: "event",
        isAlphanumeric: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        notEmpty: true,
      },

      image: {
        type: DataTypes.STRING,
      },

      numOfSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },

      numOfSeats: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },

      startDate: {
        type: DataTypes.DATE,
      },

      bookedSeats: {
        type: DataTypes.INTEGER,
      },
      endDate: {
        type: DataTypes.DATE,
      },
    },
    { createdAt: false, updatedAt: false }
  );
};
