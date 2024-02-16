const bookContainer = document.querySelector('.book-container');
const inputs = document.querySelectorAll('input');
const submitButton = document.querySelector('.add');
const sort = document.querySelector('#sort');
const filter = document.querySelector('#filter');
const filterContainer = document.querySelector('.filter-container');

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

Book.prototype.toggleRead = function () {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    };
};


let myLibrary = [];

//checks for stored books and displays on load
function checkStorage() {
    if (localStorage.length) {
        const myLibraryString = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(myLibraryString);
        console.table(myLibrary);

        displayLibrary();
    };
};

function displayLibrary(book) {
    if (book) {
        addToLibrary(book);
    } else {
        let library = [];
        if (isFiltered) {
            library = filteredLib;
        } else if (isSorted) {
            library = sortedLib;
        } else library = myLibrary;

        for (let i = 0; i < library.length; i++) {
            addToLibrary(library[i]);
            Object.setPrototypeOf(library[i], Book.prototype);
        };
    };
};


let columnCount = 0;

function addToLibrary(book) {

    if (columnCount === 4) {
        const line = document.createElement('div')
        line.classList.add('dividing-line');
        bookContainer.appendChild(line);
        columnCount = 0;
    }
    columnCount++;


    const bookButtons = document.createElement('div');
    bookButtons.classList.add('book-buttons-container');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('book-btn', 'delete-btn', 'material-symbols-outlined');
    deleteBtn.textContent = 'close';

    const readBtn = document.createElement('button');
    readBtn.classList.add('book-btn', 'read-btn', 'material-symbols-outlined');
    (book.read) ? readBtn.textContent = 'book_2' : readBtn.textContent = 'auto_stories';

    bookButtons.append(deleteBtn, readBtn);
    bookButtonListener(bookButtons);

    bookContainer.appendChild(bookButtons);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = book.title;

    //gold lines around author name
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

    let pageStack = document.createElement('div');

    //reduces total number of pages to smaller size
    const numOfPages = Math.ceil((book.pages / 10) / 4.2);

    leftPosition = -3;
    topPosition = -2;

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
    backCover.classList.add('back-cover');
    backCover.style.left = `${leftPosition + 6}px`;
    backCover.style.top = `${topPosition + 3}px`;
    backCover.style.zIndex = -numOfPages - 1;
    pageStack.appendChild(backCover);

    bookCard.appendChild(pageStack);
};


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('#book-form');
    if (validateForm(form)) {
        const formData = new FormData(form);

        const bookValues = Array.from(formData.values());
        const book = new Book(...bookValues);

        storeBook(book);
        displayLibrary(book);
        form.reset();
    } else errorMessage();
});

function validateForm(form) {
    const inputs = Array.from(form.elements);

    for (let i = 0; i < 4; i++) {
        const value = inputs[i].value;
        if (!value) {
            return false;
        };
    };
    return true;
};

function errorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-msg');
    errorMessage.textContent = 'Please fill out all fields.';

    submitButton.insertAdjacentElement('beforebegin', errorMessage);
    setTimeout(() => errorMessage.remove(), 5000);

    return false;
};

function storeBook(book) {
    console.log(book);
    myLibrary.push(book); 
    updateStorage();
};

//overwrites stored library array
function updateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};


function bookButtonListener(node) {
    node.childNodes.forEach(child => {
        child.addEventListener('click', () => {
            if (child === node.firstChild) {
                deleteFromLibrary(node);
                updateStorage();
                clearDisplay();

                if (isFiltered && isSorted) {
                    sortBooks();
                    filterBooks();
                } else if (isFiltered) {
                    filterBooks();
                } else if (isSorted) {
                    sortBooks();
                };

                displayLibrary();

            } else {
                let text = document.createElement('p');
                text.classList.add('btn-text');
                toggleReadValue(node);
                updateStorage();
                if (child.textContent === 'book_2') {
                    child.textContent = 'auto_stories';
                    text.textContent = 'Not Read';
                } else {
                    child.textContent = 'book_2';
                    text.textContent = 'Read';
                };
                node.appendChild(text);
                setTimeout(() => text.remove(), 2300);
            };
        });
    });
};



function deleteFromLibrary(node) {
    myLibrary.splice(findBookIndex(node), 1);
};

function toggleReadValue(node) {
    bookObj = myLibrary[findBookIndex(node)];
    bookObj.toggleRead();
};

function findBookIndex(node) {
    const book = node.nextElementSibling;
    const bookInfo = book.childNodes;
    let title;
    let author;
    const matching = (elem) => {
        if (elem.title === title) {
            return elem.author === author;
        };
    };

    for (let i = 0; i < 3; i++) {
        if (bookInfo[i].classList.contains('title')) {
            title = bookInfo[i].textContent;
        } else if (bookInfo[i].classList.contains('author')) {
            author = bookInfo[i].textContent;
        };
    };

    const index = myLibrary.findIndex(matching);
console.log(index);
    return index;
};

function clearDisplay() {
    columnCount = 0;
    while (bookContainer.firstChild) {
        bookContainer.removeChild(bookContainer.firstChild);
    };
};


let searchLib = [];
const search = document.querySelector('#search');

search.addEventListener('keyup', () => {
    //makes search result case insensitive 
    const userEntry = search.value.toLowerCase();
    searchLib = myLibrary.filter(book => {
        const lowerCaseTitle = book.title.toLowerCase(); 
        return lowerCaseTitle.startsWith(userEntry);
    });

    clearDisplay();

    isFiltered = false;
    filter.value = 'placeholder';
    isSorted = false;
    sort.value = 'placeholder';

    while (filterContainer.firstChild) {
        filterContainer.removeChild(filterContainer.firstChild);
    };

    searchLib.forEach(book => displayLibrary(book));
});

let filteredLib = [];
let sortedLib = [];
let isFiltered = false;
let isSorted = false;

filter.addEventListener('change', (e) => {
    const select = e.target;
    const value = select.value;
    const text = select.options[select.selectedIndex].text;

    addBubbleIcon('filter');

    filterBooks();

    clearDisplay();
    displayLibrary();
});

function filterBooks() {
    const value = filter.value;
    isFiltered = true;
    let books = [];
    (isSorted) ? books = sortedLib : books = myLibrary;

    if (value === 'read') {
        filteredLib = books.filter(book => book.read);
    } else if (value === 'not-read') {
        filteredLib = books.filter(book => !book.read);
    } else {
        filteredLib = books.filter(book => book.genre === value);
    };
};

sort.addEventListener('change', () => {
    addBubbleIcon('sort');
    sortBooks(); 

    if (isFiltered) {
        filterBooks();
    };
    clearDisplay();
    displayLibrary();
});

function sortBooks() {
    const value = sort.value;
    const text = sort.options[sort.selectedIndex].text;
    sortedLib = myLibrary.slice();
    isSorted = true;

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
};

function addBubbleIcon(type) {
    let selectionText = '';

    if (type === 'filter') {
        selectionText = filter.options[filter.selectedIndex].text;
    } else if (type === 'sort') {
        selectionText = sort.options[sort.selectedIndex].text;
    }

    const bubble = document.createElement('button');
    bubble.classList.add('filter-button', `${type}`);

    const btnText = document.createElement('span');
    btnText.textContent = selectionText;

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = 'close';

    bubble.append(btnText, icon);
    cancelBtnListener(bubble);

    //checks for pre-existing filter/sort icons, if found, replaces with new selection
    const elems = Array.from(filterContainer.childNodes);
    let matchFound = false;
    elems.forEach(elem => {
        if (elem.classList.contains(type)) {
            filterContainer.replaceChild(bubble, elem);
            matchFound = true;
        };
    });
    // if not found adds as new icon
    if (!matchFound) filterContainer.appendChild(bubble);
};


function cancelBtnListener(node) {
    node.addEventListener('click', () => {
        node.remove();
        if (node.classList.contains('filter')) {
            filter.value = 'placeholder';
            isFiltered = false;
            clearDisplay();
            displayLibrary();
        } else {
            sort.value = 'placeholder';
            isSorted = false;
            if (isFiltered) {
                filterBooks();
            };
            clearDisplay();
            displayLibrary();
        };
    });
};

const deleteLibrary = document.querySelector('.delete');

deleteLibrary.addEventListener('click', () => {
    localStorage.clear();
    myLibrary.length = 0;
    if (bookContainer.firstChild) {
        clearDisplay();
    } else {
        deleteLibrary.style.backgroundColor = 'rgb(255, 98, 98)';
        setTimeout(() => {
            deleteLibrary.style.backgroundColor = '';
        }, 500);
    };
});

const checkbox = document.querySelector('.checkbox');
const toggle = document.querySelector('#circle');
const not = document.querySelector('.not');
const readText = document.querySelector('.read-text');

//animates read/not-read toggle checkbox
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
});

//animates input labels
inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        const label = document.querySelector(`.${input.id}`);
        label.style.bottom = '20px';
    })

    input.addEventListener('blur', () => {
        const label = document.querySelector(`.${input.id}`);
        if (!input.value) return label.style.bottom = '0px';
    });
});

checkStorage();