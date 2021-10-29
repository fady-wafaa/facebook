const roles = require('../../ALL_Roles/roles');
const adminPolicy = require('./adminPolicy.js');
const userPolicy = require('./userPolicy.js');
const asdminpolicy  = require('./asdminpolicy.js');

const  opts = {
    [roles.ADMIN]:{
        can: adminPolicy,
    },
    [roles.USER]:{
        can: userPolicy,
    },
    [roles.SAdmin]:{
        can: asdminpolicy,
    }
};

module.exports = opts