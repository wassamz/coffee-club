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
        Member.createMember(request.payload, function(err, member) {
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
        
        Member.removeMember(request.payload, function(err, member) {
            if (!err) {
                reply("SUCCESS: Member Removed");
            } else {
                reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};

exports.update = {
    validate: {
        payload: {
            id: Joi.number().required(),
            newMemberName: Joi.string().required(),
            newMemberEmail: Joi.string().email().required()
        }
    },
    handler: function(request, reply) {
        
        Member.updateMember(request.payload, function(err, member) {
            if (!err) {
                reply("SUCCESS: Member Updated");
            } else {
                reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};