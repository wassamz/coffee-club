Config = require('../config/config');
Common = require('./common');

//query the database for a list of users
var Member = require('../model/member').Member,
    Boom = require('boom');

var pairs = [];

exports.pairMembers = {
    handler: function (request, reply) {

        Member.find(function (err, people) {
            if (err) {
                console.log(Boom.wrap(err, 'Internal MongoDB error'));
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }
            people = shuffle(people);
            console.log(people);

            let half = Math.floor(people.length / 2);

            for (i = 0; i < half; i++) {
                console.log(people[i] + '<>' + people[half + i]);
                pairs.push(pariedMember = { member1: people[i], member2: people[half + i] });
            }
            console.log('preparing reply=' + JSON.stringify(pairs));
            reply(pairs);
        });

    }
};
exports.pairAndEmail =
    function () {
        pairUp();
        emailMembers();
    };

//randomize the list of pairs
function pairUp() {
    pairs = [];
    Member.find(function (err, people) {
        if (err) {
            //return reply(Boom.wrap(err, 'Internal MongoDB error'));
            console.log(Boom.wrap(err, 'Internal MongoDB error'));
        }
        /*console.log('\nCURRENT\n--------');
        console.log(people);
        people = shuffle(people);
        console.log('\SHUFFLE\n--------');
        console.log(people);
        console.log('\PAIR\n--------');*/
        let half = Math.floor(people.length / 2);
        
        for (i = 0; i < half; i++) {
            console.log(people[i] + '<>' + people[half + i]);
            pairs.push(pariedMember = { member1: people[i], member2: people[half + i] });
        }
        console.log('preparing reply=' + JSON.stringify(pairs));

    });
    return pairs;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//send emails to each user on who their pair is
exports.emailMembers = {
    handler: function (request, reply) {
        console.log('Email Members');
        //loop through each pair
        var pairsEmailed = [];
        for (i = 0; i < pairs.length; i++) {
            console.log(pairs[i]);
            //send each pair an individual email indicating who their other pair is
            var email = pairs[i].member1.memberEmail + ',' + pairs[i].member2.memberEmail;

            var message = Config.email.body 
                + pairs[i].member1.memberName + ' ' + pairs[i].member1.memberEmail + ' & ' 
                + pairs[i].member2.memberName + ' ' + pairs[i].member2.memberEmail;
            
            Common.mail(Config.email.sender, email, Config.email.subject, message);
            pairsEmailed.push(message);
            console.log('Pair' + i + ' ' + message);
        }
        reply(pairsEmailed);
    }
};
