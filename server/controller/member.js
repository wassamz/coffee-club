var Joi = require('joi'),
    Member = require('../model/member').Member,
    Boom = require('boom');

exports.create = {
    validate: {
        payload: {
            memberName: Joi.string().required(),
            memberEmail: Joi.string().email().required()
        }
    },
    handler: function(request, reply) {
        Member.saveMember(request.payload, function(err, user) {
            if (!err) {
                reply("SUCCESS: Member Saved");
            } else {
                reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};