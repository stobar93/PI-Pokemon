const { Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
let start = 1;
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    id:{
      type: DataTypes.STRING,
      defaultValue: function(){return (start++) + '-DB' },
      primaryKey: true,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgUrl:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        isUrl: true,
      }
    }
  });
};

// [ ] Pokemon con las siguientes propiedades:
//   - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
//   - Nombre *
//   - Vida
//   - Fuerza
//   - Defensa
//   - Velocidad
//   - Altura
//   - Peso