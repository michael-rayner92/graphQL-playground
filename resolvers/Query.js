exports.Query = {
	products: (_parent, { filter }, { db }) => {
		let filteredProducts = db.products;

		if (filter) {
			const { avgRating, onSale } = filter;

			if (onSale) {
				filteredProducts = filteredProducts.filter((product) => {
					return product.onSale;
				});
			}

			if ([1,2,3,4,5].includes(avgRating)) {
				filteredProducts = filteredProducts.filter((product) => {
					let sumRating = 0;
					let numberOfReviews = 0;

					db.reviews.forEach(review => {
						if (review.productId === product.id) {
							sumRating += review.rating;
							numberOfReviews++;
						}
					});

					const avgProductRating = sumRating / numberOfReviews;
					return avgProductRating >= avgRating;
				});
			}
		}

		return filteredProducts;
	},
	product: (_parent, { id: productId }, { db }) => {
		return db.products.find((product) => product.id === productId);
	},
	categories: (_parent, _args, { db }) => {
		return db.categories;
	},
	category: (_parent, { id: categoryId }, { db }) => {
		return db.categories.find((category) => category.id === categoryId);
	}
};
