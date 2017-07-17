var hooks = require('hooks');

var userId;
var organizationId;
var organizationIdCreated;

hooks.after("Users > Users Collection > Get All Users", function (transaction) {
    let userList = JSON.parse(transaction.real.body);
    if (userList) {
        userId = userList[0]._id;
    }
});

hooks.before("Users > User > Get User", function (transaction) {
    if (userId) {
        transaction.request.uri = transaction.fullPath = transaction.fullPath.replace('1', userId);
    }
});

hooks.after("Organizations > Organizations Collection > Get All Organizations", function (transaction) {
    let organizationList = JSON.parse(transaction.real.body);
    if (organizationId) {
        organizationId = organizationList[0]._id;
    }
});

hooks.before("Organizations > Organizations Users > Get  Organizations Users", function (transaction) {
    if (organizationId) {
        transaction.request.uri = transaction.fullPath = transaction.fullPath.replace('1', organizationId);
    }
});


hooks.after("Organizations > Organizations Collection > Create Organization", function (transaction) {
    organizationIdCreated = JSON.parse(transaction.real.body)._id;
});


hooks.before("Organizations > Organization > Delete Organization", function (transaction) {
    if (organizationIdCreated) {
        transaction.request.uri = transaction.fullPath = transaction.fullPath.replace('1', organizationIdCreated);
    }
});
