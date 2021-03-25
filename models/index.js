const User = require('./User');
const Dog = require('./Dog');
const Owner = require('./Owner');


User.hasOne(Owner, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Owner.belongsTo(User, {
    foreignKey: 'user_id'
});

Owner.hasMany(Dog, {
    foreignKey: 'owner_id',
    onDelete: 'CASCADE'
});

Dog.belongsTo(Owner, {
    foreignKey: 'owner_id'
});



module.exports = {
    User,
    Dog,
    Owner
};