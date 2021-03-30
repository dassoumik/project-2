const User = require('./User');
const Dog = require('./Dog');
const Owner = require('./Owner');
const Date = require('./Date');
const OwnerDate = require('./OwnerDate');
const OwnerDog = require('./OwnerDog');


User.hasOne(Owner, {
    foreignkey: 'user_id',
    as: 'owner'
})


Owner.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userOwner',
});

// Dog.hasOne(Owner, {
//     foreignKey: 'id',
//     onDelete: 'CASCADE',
//     as: 'ownerDog',
//     constraints: false,
// });

Owner.belongsToMany(Dog, {
    through: {
        model: OwnerDog,
        foreignKey: 'owner_id',
        unique: false,
        onDelete: 'cascade'
    },
    as: 'dogOwner',
    constraints: false,
});

Owner.belongsToMany(Date, {
    as: 'owner1Date',
    through: {
    model: OwnerDate,
    foreignKey: 'owner1_id',
    unique: false,
    // onDelete: 'CASCADE',
  },
  constraints: false,
});

Owner.belongsToMany(Date, {
    as: 'owner2Date',
    through: {
    model: OwnerDate,
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
    OwnerDate,
    OwnerDog
};