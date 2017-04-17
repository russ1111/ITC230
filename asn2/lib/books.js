let books = [
    {title: "dune", author: "frank herbert", pubdate: "1969"},
    {title: "it", author: "stephen king", pubdate: "1975"},
    {title: "moby dick", author: "herman melville", pubdate: "1869"},
    {title: "othello", author: "william shakespeare", pubdate: "1603"},
    {title: "hamlet", author: "william shakespeare", pubdate: "1609"}
];


exports.add = (newBook) => {
    var found = this.get(newBook.title);
    if (!found) {
//        newBook.id = leads.length;
        books.push(newBook);
    }
    var action = (found) ? "updated" : "added";
    return {"action": action, "total": leads.length };
}

exports.get = (title) => {
    return books.find((item) => {
        return item.title == title;
    });
}

exports.remove = (title) => {
    var len = books.length;    
    books = books.filter((item) => {
        return item.title !== title;
    });
    var action = (books.length == len) ? "" : "deleted";
    return { "title": title, "action": action, "Total books now in collection": books.length };
}
