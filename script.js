const myLibrary = [];

const bookContainer = document.querySelector('.book-container');
const checkbox = document.querySelector('.checkbox');
const toggle = document.querySelector('#circle');
const inputs = document.querySelectorAll('input')
const not = document.querySelector('.not');
const readText = document.querySelector('.read-text');
const submitForm = document.querySelector('.add');
const deleteLibrary = document.querySelector('.delete');
const sort = document.querySelector('#sort');
const filter = document.querySelector('#filter');
const filterContainer = document.querySelector('.filter-container')

let filteredLib = [];
let sortedLib = [];
let isFiltered = false;
let isSorted = false;


filter.addEventListener('change', (e) => {
    const select = e.target;
    const value = select.value;
    const text = select.options[select.selectedIndex].text;

    if (isSorted) {
        if (isFiltered) {
            sortedLib = myLibrary.slice();
            console.log(sortedLib);
            sortBooks();
            filterBooks(sortedLib, value);
        } else {
            filterBooks(sortedLib, value);
        };
    } else {
        filterBooks(myLibrary, value);
    };

    clearDisplay();
    columnCount = 0;
    displayLibrary(filteredLib, null);

    addBubbleIcon(text);
    isFiltered = true;
});

function filterBooks(books, value) {
    if (value === 'read') {
        filteredLib = books.filter(book => book.read);
    } else if (value === 'not-read') {
        filteredLib = books.filter(book => !book.read);
    } else {
        filteredLib = books.filter(book => book.genre === value);
    };
};

function addBubbleIcon(filterName) {

    if (filterContainer.firstChild) {
        filterContainer.removeChild(filterContainer.firstChild);
    };

    const bubble = document.createElement('div');
    bubble.classList.add('filter-bubble');

    const text = document.createElement('span');
    text.textContent = filterName;

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = 'close';

    bubble.append(text, icon);
    filterContainer.appendChild(bubble);
};


function sortBooks() {
    const value = sort.value;
    const text = sort.options[sort.selectedIndex].text;

    sortedLib.sort((a, b) => {
        const bookA = a[value];
        const bookB = b[value];

        if (text === 'Ascending') {
            if (bookA < bookB) {
                return -1;
            } else if (bookA > bookB) {
                return 1;
            } else return 0;
        } else {
            if (bookA > bookB) {
                return -1;
            } else if (bookA < bookB) {
                return 1;
            } else return 0;
        };
    });

    console.log(`sorted array: ${sortedLib}`);
};

function copyLibrary() {
    if (isFiltered) {
        sortedLib = filteredLib.slice();
    } else {
        sortedLib = myLibrary.slice();
    };
};


sort.addEventListener('change', () => {
    const text = sort.options[sort.selectedIndex].text

    copyLibrary();

    sortBooks();

    clearDisplay();
    columnCount = 0;
    displayLibrary(sortedLib, null);
    addBubbleIcon(text);
    isSorted = true;
});


deleteLibrary.addEventListener('click', () => {
    localStorage.clear();
    myLibrary.length = 0;
    columnCount = 0;
    if (bookContainer.firstChild) {
        clearDisplay();
    } else {
        deleteLibrary.style.backgroundColor = 'rgb(255, 98, 98)';
        setTimeout(() => {
            deleteLibrary.style.backgroundColor = '';
        }, 500);
    };
});


submitForm.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('#book-form');

    const formData = new FormData(form);

    const bookValues = Array.from(formData.values());
    const book = new Book(...bookValues);
    console.log(`book = ${book}`);

    storeBook(book);
    displayLibrary(null, book);
    form.reset();
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
    input.addEventListener('focus', () => {
        const label = document.querySelector(`.${input.id}`);
        label.style.bottom = '20px';
    })

    input.addEventListener('blur', () => {
        const label = document.querySelector(`.${input.id}`);
        if (!input.value) return label.style.bottom = '0px';
    })
})


function Book(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    (read) ? this.read = read : this.read = false;

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
    let book = new Book('The Two Towers', 'J.R.R. Tolkein', 'fantasy', 310, false)
    storeBook(book);

    /*let book1 = new Book('A Brave New World', 'Aldous Huxley', 'sci-fi', 200, false)

    myLibrary.push(book1);

    let book2 = new Book('1984', 'George Orwell', 'sci-fi', 543, false)

    myLibrary.push(book2);*/
};

function storeBook(book) {
    myLibrary.push(book); //adds book to library array
    const bookIndex = myLibrary.length - 1;
    localStorage.setItem(`${bookIndex}`, JSON.stringify(book)); //copies book across to storage with matching index

    console.log(`Storage Length: ${localStorage.length}`); //test
};

//pushes any stored books straight onto library array
function checkStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        savedBook = JSON.parse(localStorage.getItem(`${i}`));

        myLibrary.push(savedBook);
    };
};


function displayLibrary(library, book) {
    if (library && !book) {
        for (let i = 0; i < library.length; i++) {
            addToLibrary(library[i])
        };
    } else if (book) {
        addToLibrary(book);
    };
    console.log('books generated!'); //test
};

function clearDisplay() {
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    };
    console.log('display cleared!'); //test
};

let columnCount = 0;

function addToLibrary(book) {

    if (columnCount === 4) {
        const line = document.createElement('div')
        line.classList.add('dividing-line');
        bookContainer.appendChild(line);
        columnCount = 0
    }
    columnCount++;

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






checkStorage();
displayLibrary(myLibrary);
console.log(myLibrary);
//addToLibrary();

