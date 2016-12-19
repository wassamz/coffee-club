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
        Member.saveMember(request.payload, function(err, member) {
            if (!err) {
                reply("SUCCESS: Member Saved");
            } else {
                reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};

exports.remove = {
    validate: {
        payload: {
            memberEmail: Joi.string().email().required()
        }
    },
    handler: function(request, reply) {
        
        Member.deleteMember(request.payload, function(err, member) {
            if (!err) {
                reply("SUCCESS: Member Removed");
            } else {
                reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};