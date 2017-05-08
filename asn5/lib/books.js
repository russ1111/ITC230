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

exports.all = () => {
    return books;
}

exports.remove = (title) => {
    var len = books.length;    
    books = books.filter((item) => {
        return item.title !== title;
    });

    return { "deleted": (books.length !== len), "total": books.length };
}

exports.add = (newBook) => {
    var len = books.length;
    
    if(!(this.get(newBook.title))){
       books.push(newBook); 
    }
    
    return { "added": (books.length !== len), "total": books.length };
}
    