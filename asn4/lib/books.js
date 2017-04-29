let books = [
    {title: "dune", author: "frank herbert", pubdate: 1969},
    {title: "it", author: "stephen king", pubdate: 1975},
    {title: "moby dick", author: "herman melville", pubdate: 1869},
    {title: "othello", author: "william shakespeare", pubdate: 1603},
    {title: "hamlet", author: "william shakespeare", pubdate: 1609}
];


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

exports.add = (newBook) => {
    books.push(newBook);
    
    var action = "added";
    return { "title": newBook.title, "action": action, "author": newBook.author, "pubdate": parseInt(newBook.pubdate)};
}
    
