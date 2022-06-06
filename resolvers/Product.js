exports.Product = {
	category: ({ categoryId }, _args, { db }) => {
		return db.categories.find((category) => category.id === categoryId);
	},
	reviews: ({ id: productId }, _args, { db }) => {
		return db.reviews.filter((review) => review.productId === productId);
	}
};
