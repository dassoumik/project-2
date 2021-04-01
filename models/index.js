const User = require('./User');
const Dog = require('./Dog');
const Owner = require('./Owner');
const PuppyDate = require('./PuppyDate');
const OwnerDate = require('./OwnerDate');
const OwnerDog = require('./OwnerDog');
const DateList = require('./DateList');


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

Owner.hasMany(Dog);
Dog.belongsTo(Owner);
Owner.hasMany(DateList);
Dog.hasMany(DateList);
// Owner.hasMany(PuppyDate, {foreignkey: 'participant1_id'});
// Owner.hasMany(PuppyDate, {foreignkey: 'participant2_id'});

// PuppyDate.belongsTo(Owner);
// PuppyDate.belongsTo(Dog);

// Owner.belongsToMany(Dog, {
//     through: {
//         model: OwnerDog,
//         foreignKey: 'owner_id',
//         unique: false,
//         onDelete: 'cascade'
//     },
//     as: 'dogOwner',
//     constraints: false,
// });

Owner.belongsToMany(PuppyDate, {
    as: 'owner1Date',
    through: {
    model: OwnerDate,
    foreignKey: 'owner1_id',
    unique: false,
    // onDelete: 'CASCADE',
  },
  constraints: false,
});

Owner.belongsToMany(PuppyDate, {
    as: 'owner2Date',
    through: {
    model: OwnerDate,
    foreignKey: 'owner2_id',
    unique: false,
    // onDelete: 'CASCADE',
  },
  constraints: false,
});

PuppyDate.belongsToMany(Owner, {
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
    PuppyDate,
    OwnerDate,
    OwnerDog
};