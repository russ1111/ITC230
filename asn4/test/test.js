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
   expect(result.action).to.deep.equal("deleted");
 });
 
 it("remove fails w/ invalid book", () => {
   var result = book.remove("fake");
   expect(result.action).to.deep.equal("");
 });
});


describe("Book module", () => {
 it("add adds entered book", function() {
   var result = book.add({title: "1984", author: "george orwell", pubdate:1949});
   expect(result.action).to.deep.equal("added");
 });
 
 it("add fails w/ book title already in collection", () => {
   var result = book.add({title: "dune", author: "frank herbert", pubdate:1969});
   expect(result.action).to.deep.equal("");
 });
});