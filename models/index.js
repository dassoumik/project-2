const User = require('./User');
const Dog = require('./Dog');
const Owner = require('./Owner');
const Date = require('./Date');



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

Owner.hasMany(Date, {
    foreignKey: 'id',
    as: 'ownerDate',
});


Date.belongsTo(Owner, {
    foreignKey: 'id',
    as: 'dating',
});


module.exports = {
    User,
    Dog,
    Owner,
    Date,
};