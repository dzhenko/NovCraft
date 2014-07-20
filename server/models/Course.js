'use strict';
var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    name: String,
    date: Date,
    id: Number,
    show: Boolean
});

var Course = mongoose.model('Course', courseSchema);

module.exports = {
    seedInitialCourses: function() {
        Course.find({}).exec(function(err, collection){
            if (err) {
                console.log('Can not find users ' + err);
                return;
            }

            if (collection.length === 0) {
                Course.create({name: 'C# for Sociopaths', show: true, date: new Date('10/5/2013'), id: 1});
                Course.create({name:'name 2', date: new Date('2/07/2014'), id: 2, show:false});
                Course.create({name:'name 3', date: new Date('3/07/2014'), id: 3, show:true});
                Course.create({name:'name 4', date: new Date('4/07/2014'), id: 4, show:true});
                Course.create({name:'name 5', date: new Date('5/07/2014'), id: 5, show:false});
                Course.create({name:'name 6', date: new Date('6/07/2014'), id: 6, show:false});
                Course.create({name:'name 7', date: new Date('7/07/2014'), id: 7, show:true});
                Course.create({name:'name 8', date: new Date('8/07/2014'), id: 8, show:false});
                Course.create({name:'name 9', date: new Date('9/07/2014'), id: 9, show:true});
                Course.create({name:'name 10', date: new Date('10/07/2014'), id: 10, show:true});
                Course.create({name:'name 11', date: new Date('11/07/2014'), id: 11, show:false});
                Course.create({name:'name 12', date: new Date('12/07/2014'), id: 12, show:true});

                console.log('Courses collection was empty - added 12 test courses');
            }
        })
    },
    removeAll: function() { // TODO: Remove after development
        Course.remove({}).exec(function(err){
            if (err) {
                console.log('Can not delete resources ' + err);
            }
            else {
                console.log('All Courses deleted successfully');
            }
        })
    },
};