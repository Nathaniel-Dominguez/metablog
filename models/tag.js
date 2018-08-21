'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    models.tag.belongsToMany(models.article, { through: 'articleTags'});
  };
  return tag;
};