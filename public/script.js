document.addEventListener('DOMContentLoaded', () => {
	const bookForm = document.querySelector('#book-form');
	const bookList = document.querySelector('#book-list');
	const inputId = document.querySelector('#book-id');
	const inputTitle = document.querySelector('#title');
	const inputAuthor = document.querySelector('#author');
	const inputPublishedDate = document.querySelector('#published-date');
	const inputPages = document.querySelector('#pages');

	const apiUrl = 'https://books-two-alpha.vercel.app/api/books';

	bookForm.addEventListener('submit', async (event) => {
		event.preventDefault();

		const bookData = {
			title: inputTitle.value,
			author: inputAuthor.value,
			publishedDate: inputPublishedDate.value,
			pages: inputPages.value,
			image: '/images/' + inputTitle.value.split(' ').join('_') + '.jpg'
		};

		if(inputId.value) {
			await fetch(`${apiUrl}/${inputId.value}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookData)
			});
		} else {
			await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookData)
			});
		}

		bookForm.reset();
		inputId.value = '';
		loadBooks();
	});

	async function loadBooks() {
		bookList.innerHTML = '';
		const response = await(fetch(apiUrl));
		const books = await response.json();
		books.forEach(book => {
			const card = document.createElement('div');
			card.classList = 'card col-6 g-0';
			const div = document.createElement('div');
			div.classList = 'row g-0';
				const left = document.createElement('div');
				left.classList = 'col-4';
					const image = document.createElement('img');
					image.src = book.image;
					image.classList = 'img-fluid object-fit-contain rounded-start';
					left.appendChild(image);
				div.appendChild(left);

				const right = document.createElement('div');
				right.classList = 'col-8';
					const header = document.createElement('div');
					header.classList = 'card-header';
						const title = document.createElement('h6');
						title.classList = 'fs-2 fw-lighter';
						title.textContent = book.title;
						header.appendChild(title);
					right.appendChild(header);
					const body = document.createElement('ul');
					body.classList = 'card-body list-group list-group-flush';
						const author = document.createElement('li');
						author.classList = 'list-group-item';
						author.textContent = book.author;
						body.appendChild(author);
						const publishedDate = document.createElement('li');
						publishedDate.classList = 'list-group-item';
						const date = new Date(book.publishedDate).toLocaleDateString('en-US');
						publishedDate.textContent = 'Published date: ' + date;
						body.appendChild(publishedDate);
						const pages = document.createElement('li');
						pages.classList = 'list-group-item';
						pages.textContent = book.pages + ' pages';
						body.appendChild(pages);
						const bottom = document.createElement('li');
						bottom.classList = 'list-group-item';
						body.appendChild(bottom);
					right.appendChild(body);
				div.appendChild(right);
			card.appendChild(div);

			const footer = document.createElement('div');
			footer.classList = 'card-footer text-center text-body-secondary';
				const buttonEdit = document.createElement('button');
				buttonEdit.classList = 'btn btn-primary mx-2';
				buttonEdit.textContent = 'Edit';
				buttonEdit.addEventListener('click', () => {
					inputId.value = book._id;
					inputTitle.value = book.title;
					inputAuthor.value = book.author;
					inputPublishedDate.value = new Date(book.publishedDate).toISOString().split('T')[0];
					inputPages.value = book.pages;
					scrollTo({top: 0, behavior: 'smooth'})
				});
				footer.appendChild(buttonEdit);
				const buttonDelete = document.createElement('button');
				buttonDelete.classList = 'btn btn-danger';
				buttonDelete.textContent = 'Delete';
				buttonDelete.addEventListener('click', async () => {
					await fetch(`${apiUrl}/${book._id}`, {
						method: 'DELETE'
					});
					loadBooks();
				});
				footer.appendChild(buttonDelete);
			card.appendChild(footer);
			bookList.appendChild(card);
		});
	}

	loadBooks();
});