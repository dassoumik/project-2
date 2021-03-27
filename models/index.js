const User = require('./User');
const Dog = require('./Dog');
const Owner = require('./Owner');
const Date = require('./Date');
const OwnerDate = require('./OwnerDate');


Owner.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userOwner',
});

Owner.hasMany(Dog, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE',
    as: 'ownerDog',
});

Dog.belongsTo(Owner, {
    foreignKey: 'owner_id',
    as: 'dogOwner',
});

Owner.belongsToMany(Date, {
    as: 'ownerDate',
    through: {
    model: OwnerDate,
    foreignKey: 'owner1_id',
    foreignKey: 'owner2_id',
    unique: false,
    // onDelete: 'CASCADE',
  },
  constraints: false,
});


Date.belongsToMany(Owner, {
    as: 'dating',
    through: {
        model: OwnerDate,
        foreignKey: 'date_id',
        unique: false,
        // onDelete: 'CASCADE',
      },
      constraints: false,
});


module.exports = {
    User,
    Dog,
    Owner,
    Date,
    OwnerDate
};