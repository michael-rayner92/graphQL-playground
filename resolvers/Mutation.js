const { v4: uuid } = require('uuid');

exports.Mutation = {
	addCategory: (_parent, { input }, { db }) => {
		const { name } = input;

		const newCategory = {
			id: uuid(),
			name
		};

		db.categories.push(newCategory);
		return newCategory;
	},
	addProduct: (_parent, { input }, { db }) => {
		const { name, description, image, price, onSale, quantity, categoryId } = input;

		if (!db.categories.find((category) => category.id === categoryId)) {
			throw new Error(`Category with ID: "${categoryId}" does not exist!`);
		}

		const newProduct = {
			id: uuid(),
			name,
			description,
			image,
			price,
			onSale,
			quantity,
			categoryId
		};

		db.products.push(newProduct);
		return newProduct;
	},
	addReview: (_parent, { input }, { db }) => {
		const { date, title, comment, rating, productId } = input;

		if (!db.products.find((product) => product.id === productId)) {
			throw new Error(`Product with ID: "${productId}" does not exist!`);
		}

		const newReview = {
			id: uuid(),
			date,
			title,
			comment,
			rating,
			productId
		};

		db.reviews.push(newReview);
		return newReview;
	},
	deleteCategory: (_parent, { categoryId }, { db }) => {
		if (!db.categories.find((category) => category.id === categoryId)) {
			throw new Error(`Category with ID: "${categoryId}" does not exist!`);
		}

		db.categories = db.categories.filter((category) => category.id !== categoryId);

		db.products = db.products.map((product) => {
			if (product.categoryId !== categoryId) return product;
			return { ...product, categoryId: null };
		});

		return true;
	},
	deleteProduct: (_parent, { productId }, { db }) => {
		if (!db.products.find((product) => product.id === productId)) {
			throw new Error(`Product with ID: "${productId}" does not exist!`);
		}

		db.reviews = db.reviews.filter((review) => review.productId !== productId);
		db.products = db.products.filter((product) => product.id !== productId);

		return true;
	},
	deleteReview: (_parent, { reviewId }, { db }) => {
		if (!db.reviews.find(review => review.id === reviewId)) {
			throw new Error(`No Review found with ID: ${reviewId}`);
		}

		db.reviews = db.reviews.filter(review => review.id !== reviewId);
		return true;
	},
	updateCategory: (_parent, { categoryId, input }, { db }) => {
		const index = db.categories.findIndex(category => category.id === categoryId);
		if (index === -1) return null;

		db.categories[index] = {
			...db.categories[index],
			...input
		}

		return db.categories[index];
	},
	updateProduct: (_parent, { productId, input }, { db }) => {
		const index = db.products.findIndex(product => product.id === productId);
		if (index === -1) return null;

		db.products[index] = {
			...db.products[index],
			...input
		}

		return db.products[index];
	},
	updateReview: (_parent, { reviewId, input }, { db }) => {
		const index = db.reviews.findIndex(review => review.id === reviewId);
		if (index === -1) return null;

		db.reviews[index] = {
			...db.reviews[index],
			...input
		}

		return db.reviews[index];
	}
};
