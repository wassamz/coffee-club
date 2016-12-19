//query the database for a list of users
var Member = require('../model/member').Member,
    Boom = require('boom');

exports.pairNow = {
    handler: function (request, reply) {
        pairUp();
    }
};
exports.pairAndEmail =
    function () {
        pairUp();
        emailMembers();
    };

//randomize the list of pairs
function pairUp() {
    Member.find(function (err, people) {
        if (err) {
            //return reply(Boom.wrap(err, 'Internal MongoDB error'));
            console.log(Boom.wrap(err, 'Internal MongoDB error'));
        }
        console.log(people);
    })
}
//send emails to each user on who their pair is
function emailMembers() { }
