document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');
    const bookId = document.getElementById('book-id');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const publishedDate = document.getElementById('publishedDate');
    const pages = document.getElementById('pages');

    const apiUrl = 'https://books-lime-gamma.vercel.app/api/books';

    bookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const bookData = {
            title: title.value,
            author: author.value,
            publishedDate: publishedDate.value,
            pages: pages.value
        };

        if(bookId.value) {
            // Actualizar libro
            await fetch(`${apiUrl}/${bookId.value}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
        } else {
            // Crear nuevo libro
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
        }

        bookForm.reset();
        bookId.value = '';
        loadBooks();
    });

async function loadBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();

    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        li.dataset.id = book._id;
        li.classList.add('px2');
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-primary', 'ms-2');
        editButton.addEventListener('click', () =>{
            bookId.value = book._id;
            title.value = book.title;
            author.value = book.author;
            publishedDate.value = new Date(book.publishedDate).toISOString().split('T')[0];
            pages.value = book.pages;
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'ms-2');
        deleteButton.addEventListener('click', async () => {
            await fetch(`${apiUrl}/${book._id}`, {
                method: 'DELETE'
            });
            loadBooks();            
        });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    bookList.appendChild(li);
});
}

loadBooks();
});
