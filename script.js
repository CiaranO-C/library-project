const myLibrary = [];
let unreadBooks = myLibrary.filter(book => !book.read);
let readBooks = myLibrary.filter(book => book.read);
const bookContainer = document.querySelector('.book-container');

function Book(title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
};


function getBook() {
    let book = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book);

    let book1 = new Book('1The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book1);

    let book2 = new Book('2The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book2);

    let book3 = new Book('3The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book3);

    let book4 = new Book('4The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book4);

    let book5 = new Book('5The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book5);

    let book6 = new Book('6The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book6);
}

function addToLibrary(book) {

    myLibrary.push(book);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('h3');
    title.textContent = book.title;

    const dividingLine = document.createElement('div');
    dividingLine.classList.add('line');

    const author = document.createElement('p');
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.textContent = book.pages;

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = 'swords';

    bookCard.append(title, dividingLine, author, dividingLine.cloneNode(true), pages, icon);

    bookContainer.appendChild(bookCard);

    leftPosition = -3;
    topPosition = -2;

    let pageStack = document.createElement('div');

    for (let z = 1; z <= 16; z++) {
        const bookPage = document.createElement('div');
        bookPage.style.position = 'absolute';
        bookPage.style.left = `${leftPosition}px`;
        bookPage.style.top = `${topPosition}px`;
        bookPage.style.zIndex = -z;
        bookPage.classList.add('page');
        pageStack.appendChild(bookPage);
        leftPosition += 2;
        topPosition += 1;
    }


    const backCover = document.createElement('div');
    backCover.style.position = 'absolute';
    backCover.classList.add('book-cover');
    backCover.style.left = `${leftPosition+6}px`;
    backCover.style.top = `${topPosition+3}px`;
    backCover.style.zIndex = -17; //must be one less than page count
    pageStack.appendChild(backCover);

    bookCard.appendChild(pageStack);

};







getBook();
console.log(myLibrary);
//addToLibrary();

