var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var request = require('request')
var mongoose = require('mongoose')
var Book = require("./models/BookModel")
var Person = require("./models/PersonModel")
mongoose.connect("mongodb://localhost/mongoose-practice")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    /*Books
    ----------------------*/
    //1. Find books with fewer than 500 but more than 200 pages
Book.find({ pages: { $lt: 500, $gt: 200 } }, function(err, res) {
        // console.log(res)
    })
    //2. Find books whose rating is less than 5, and sort by the author's name
Book.find({ rating: { $lt: 5 } }).sort({ author: 1 }).exec(function(err, res) {
        // console.log(res)
    })
    //3. Find all the Fiction books, skip the first 2, and display only 3 of them
Book.find({ genres: "Fiction" }).skip(2).limit(3).exec(function(err, res) {
        // console.log(res)
    })
    /*People
    ----------------------*/
    //1. Find all the people who are tall (>180) AND rich (>30000)
Person.find({ height: { $gt: 180 }, salary: { $gt: 30000 } }, function(err, res) {
        // console.log(res)
    })
    //2. Find all the people who are tall (>180) OR rich (>30000)
Person.find({ $or: [{ height: { $gt: 180 } }, { salary: { $gt: 30000 } }] }, function(err, res) {
        // console.log(res)
    })
    //3. Find all the people who have grey hair or eyes, and are skinny (<70)
Person.find({ $or: [{ hair: "grey" }, { eyes: "grey" }], weight: { $lt: 70 } }, function(err, res) {
        // console.log(res)
    })
    //4. Find people who have at least 1 kid with grey hair
Person.find({ "kids.hair": "grey" }, function(err, res) {
        // console.log(res)
    })
    //5. Find all the people who have at least one overweight kid, and are overweight themselves (>100)
Person.find({ "kids.weight": { $gt: 100 }, weight: { $gt: 100 } }, function(err, res) {
        console.log(res)
    })
    /*=====================================================
    Start the server:
    =======================================================*/
app.listen(3000, function() {
        console.log("Server up and running on port 3000")
    })
    /*=====================================================
    Create books Collection
    =======================================================*/
    // var isbns = [9780156012195, 9780743273565, 9780435905484, 9780140275360, 9780756404741, 9780756407919, 9780140177398, 9780316769488, 9780062225672, 9780143130154, 9780307455925, 9781501143519]
    // var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
    // for (var i = 0; i < isbns.length; i++) {
    //     var apiURL = url + isbns[i];
    //     loadFromAPI(apiURL)
    // }
    // console.log("done");
    // function loadFromAPI(apiURL) {
    //     request(apiURL, function(error, response, body) {
    //         var result = JSON.parse(body)
    //         if (result.totalItems && !error && response.statusCode == 200) {
    //             var resBook = JSON.parse(body).items[0].volumeInfo
    //             var book = new Book({
    //                 title: resBook.title,
    //                 author: resBook.authors ? resBook.authors[0] : '',
    //                 pages: resBook.pageCount,
    //                 genres: resBook.categories || ["Other"],
    //                 rating: resBook.averageRating || 5
    //             })
    //             //Only save if the book doesn't exist yet
    //             Book.findOne({ title: book.title }, function(err, foundBook) {
    //                 if (!foundBook) {
    //                     book.save()
    //                 }
    //             })
    //         }
    //     })
    // }
    /*=====================================================
    Create People Collection
    =======================================================*/
    // var colors = ["brown", "black", "red", "yellow", "green", "grey"]
    // var getColor = function() {
    //     return colors[Math.floor(Math.random() * colors.length)]
    // }
    // var getWeight = function() {
    //     return getRandIntBetween(50, 120)
    // }
    // var getHeight = function() {
    //     return getRandIntBetween(120, 230)
    // }
    // var getSalary = function() {
    //     return getRandIntBetween(20000, 50000)
    // }
    // var getNumKids = function() {
    //     return Math.floor(Math.random() * 3)
    // }
    // var getRandIntBetween = function(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    // }
    // var getKids = function(numKids) {
    //     var kids = [];
    //     for (var i = 0; i < numKids; i++) {
    //         kids.push({
    //             hair: getColor(),
    //             eyes: getColor(),
    //             weight: getWeight(),
    //             height: getHeight(),
    //         })
    //     }
    //     return kids;
    // }
    /*=====================================================
    the below code always makes sure
    you don't have over 100 people and
    adds new people and their kids until you do have 100
    =======================================================*/
    // Person.find({}).count(function(err, count) {
    //     // the below two loops could be changed to a simple:
    //     // for (var i = count; i < 100; i++) {}
    //     if (count < 100) {
    //         for (var i = 0; i < 100 - count; i++) {
    //             var numKids = getNumKids();
    //             var p = new Person({
    //                 hair: getColor(),
    //                 eyes: getColor(),
    //                 weight: getWeight(),
    //                 height: getHeight(),
    //                 salary: getSalary(),
    //                 numKids: numKids,
    //                 kids: getKids(numKids)
    //             });
    //             p.save();
    //         }
    //     }
    // })