const myLibrary = [];
let unreadBooks = myLibrary.filter(book => !book.read);
let readBooks = myLibrary.filter(book => book.read);
const bookContainer = document.querySelector('.book-container');
const checkbox = document.querySelector('.checkbox');
const toggle = document.querySelector('#circle');
const inputs = document.querySelectorAll('input')
const not = document.querySelector('.not');
const readText = document.querySelector('.read-text');
const submitButton = document.querySelector('.add');


submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const form = document.querySelector('#book-form');
    
    const formData = new FormData(form);
    const values = [...formData.entries()];
    console.log(values);
    console.log('poo');
    console.log(formData);
})

toggle.addEventListener('click', () => {
    if (checkbox.checked) {
        checkbox.checked = false;
        checkbox.style.backgroundColor = '';
        toggle.style.left = '1px';
        not.style.left = '0px';
        not.style.opacity = 1;
        readText.style.right = '0px';
    } else {
        checkbox.checked = true;
        checkbox.style.backgroundColor = 'rgb(127, 241, 133)';
        toggle.style.left = '20px';
        not.style.left = '35px';
        not.style.opacity = 0;
        readText.style.right = '30px';
    };
    console.log(checkbox.checked);
});

inputs.forEach((input) => {

    input.addEventListener('click', () => {
        const label = document.querySelector(`[for=${input.id}]`);
        label.style.bottom = '20px';
    })

    input.addEventListener('blur', () => {
        const label = document.querySelector(`[for=${input.id}]`);
        label.style.bottom = '0px';
    })
})


function Book(title, author, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = read;

    switch (genre) {
        case 'drama':
            this.genreIcon = 'domino_mask';
            break;

        case 'fiction':
            this.genreIcon = 'waves';
            break;

        case 'sci-fi':
            this.genreIcon = 'rocket';
            break;

        case 'non-fiction':
            this.genreIcon = 'book_2';
            break;

        case 'fantasy':
            this.genreIcon = 'swords';
            break;

        case 'mystery':
            this.genreIcon = 'mystery';
            break;
    };
};


function getBook() {
    let book = new Book('The Two Towers', 'J.R.R. Tolkein', 310, 'fantasy', false)
    addToLibrary(book);

    let book1 = new Book('A Brave New World', 'Aldous Huxley', '200', 'sci-fi', false)
    addToLibrary(book1);

    let book2 = new Book('1984', 'George Orwell', '543', 'sci-fi', false)
    addToLibrary(book2);

    let book3 = new Book('Pride & Prejudice', 'Ann Herendeen', '700', 'drama', false)
    addToLibrary(book3);

    let book4 = new Book('Lord of the Flies', 'William Golding', '320', 'fiction', false)
    addToLibrary(book4);

    let book5 = new Book('The Hobbit', 'J.R.R. Tolkein', '310', 'fantasy', false)
    addToLibrary(book5);

    let book6 = new Book('Animal Farm', 'George Orwell', '180', 'fiction', false)
    addToLibrary(book6);
}

function addToLibrary(book) {

    myLibrary.push(book);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = book.title;

    const dividingLine = document.createElement('div');
    dividingLine.classList.add('line');

    const author = document.createElement('p');
    author.classList.add('author')
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.classList.add('page-number');
    pages.textContent = book.pages;

    console.log(book.genre.icon);

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = `${book.genreIcon}`;

    bookCard.append(title, dividingLine, author, dividingLine.cloneNode(true), pages, icon);

    bookContainer.appendChild(bookCard);

    leftPosition = -3;
    topPosition = -2;

    let pageStack = document.createElement('div');
    const numOfPages = Math.ceil((book.pages / 10) / 4.2);


    for (let z = 1; z <= numOfPages; z++) {
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
    backCover.style.left = `${leftPosition + 6}px`;
    backCover.style.top = `${topPosition + 3}px`;
    backCover.style.zIndex = -numOfPages - 1; //must be one less than page count
    pageStack.appendChild(backCover);

    bookCard.appendChild(pageStack);

};







getBook();
console.log(myLibrary);
//addToLibrary();

