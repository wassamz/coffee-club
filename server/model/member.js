var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    db = require('../config/db').db;

autoIncrement.initialize(db);

/**
 * @module  Member
 * @description contain the details of Attribute
 */

var Member = new Schema({

    /** 
      memberName. It can only contain valid string, is required and indexed.
    */
    memberName: {
        type: String,
        unique: false,
        required: true
    },
    /** 
      memberEmail. It can only contain valid string, is required and indexed.
    */    
    memberEmail: {
        type: String,
        unique: true,
        required: true
    }
});

Member.plugin(autoIncrement.plugin, {
    model: 'member',
    field: '_id'
});

Member.statics.createMember = function(requestData, callback) {
    this.create(requestData, callback);
};

/*Member.statics.updateMember = function(member, callback) {
    member.save(callback);
};*/

Member.statics.findMember = function(member, callback) {
    this.findOne({
        member: member
    }, callback);
};

Member.statics.findMemberByIdAndMemberName = function(id, member, callback) {
    this.findOne({
        member: member,
        _id: id
    }, callback);
};

Member.statics.removeMember = function(requestData, callback) {
    member.remove({
        memberEmail: requestData.memberEmail
    }, callback);
};

Member.statics.updateMember = function(requestData, callback) {
    this.update(
        {
            _id: requestData.id
        },
        {
            memberName: requestData.newMemberName,
            memberEmail: requestData.newMemberEmail
         }
    , callback);
};

var member = mongoose.model('member', Member);

/** export schema */
module.exports = {
    Member: member
};