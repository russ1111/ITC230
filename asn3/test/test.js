var expect = require("chai").expect;
var book = require("../lib/books");

describe("Book module", () => {
 it("get returns requested book", function() {
   var result = book.get("dune");
   expect(result).to.deep.equal({title: "dune", author: "frank herbert", pubdate:1969});
 });
 
 it("get fails w/ invalid book", () => {
   var result = book.get("fake");
   expect(result).to.be.undefined;
 });
});


describe("Book module", () => {
 it("remove deletes requested book", function() {
   var result = book.remove("dune");
   expect(result).to.deep.equal({title: "dune", action: "deleted", "Total books now in collection": 4});
 });
 
 it("remove fails w/ invalid book", () => {
   var result = book.remove("fake");
//     expect(result).to.deep.equal(book.remove("fake"));
//     expect(result).to.be.undefined;
   expect(result).to.deep.equal("No records found for: fake");
 });
});


describe("Book module", () => {
 it("add adds entered book", function() {
     var result = book.add({title: "1984", author: "george orwell", pubdate: 1949});
     expect(result).to.deep.equal({title: "1984", action: "added", author: "george orwell", pubdate: 1949});
 });
 
 it("add fails w/ book already in collection", () => {
   var result = book.add({title: "dune", author: "frank herbert", pubdate: 1969});
//     expect(result).to.deep.equal({title: "dune", action: "added", author: "frank herbert", pubdate: 1969});
//     expect(result).to.be.undefined;
     expect(result).to.deep.equal("Title is already in the collection: dune");
 });
});