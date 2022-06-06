exports.Category = {
	products: ({ id: categoryId }, { filter }, { db }) => {
		const categoryProducts = db.products.filter((product) => product.categoryId === categoryId);

		let filteredCategoryProducts = categoryProducts;

		if (filter) {
			const { avgRating, onSale } = filter;

			if (onSale) {
				filteredCategoryProducts = categoryProducts.filter((categoryProduct) => {
					return categoryProduct.onSale;
				});
			}

			if ([1, 2, 3, 4, 5].includes(avgRating)) {
				filteredCategoryProducts = filteredCategoryProducts.filter((categoryProduct) => {
					let sumRating = 0;
					let numberOfReviews = 0;

					db.reviews.forEach((review) => {
						if (review.productId === categoryProduct.id) {
							sumRating += review.rating;
							numberOfReviews++;
						}
					});

					const avgProductRating = sumRating / numberOfReviews;
					return avgProductRating >= avgRating;
				});
			}
		}

		return filteredCategoryProducts;
	}
};
