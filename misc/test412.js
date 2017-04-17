let books = [
    {title: "dune", author: "frank herbert", pubdate: "1969"},
    {title: "it", author: "stephen king", pubdate: "1975"},
    {title: "moby dick", author: "herman melville", pubdate: "1869"}
];

let get = (title) => {
    return books.find((item) => {
        return item.title == title;
    });
}

//console.log(get("moby dick"));

//module.exports = {
//    get
//}

exports.get = (title) => {
    return books.find((item) => {
        return item.title == title;
    });
}