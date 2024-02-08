const myLibrary = [];
let unreadBooks = myLibrary.filter(book => !book.read);
let readBooks = myLibrary.filter(book => book.read);
const slider = document.querySelector('.slide-container');

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

    let book1 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book1);

    let book2 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book2);

    let book3 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book3);

    let book4 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book4);

    let book5 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book5);

    let book6 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'Fantasy', false)
    addToLibrary(book6);
}

function addToLibrary(book) {
    
    myLibrary.push(book);

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

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
    icon.textContent = 'import_contacts';

    bookContainer.append(title, dividingLine, author, dividingLine.cloneNode(true), pages, icon);

    
    slider.appendChild(bookContainer);
};


let isDown = false;
let xStart;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
isDown = true;
xStart = e.screenX
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if(!isDown) return;
    else {
        
        console.log(xStart);
    }
})




getBook();
console.log(myLibrary);
//addToLibrary();

