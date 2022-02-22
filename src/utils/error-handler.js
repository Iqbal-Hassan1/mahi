export const errorHandler = (error, req, res, next) => {

	if (error.errors) {
		return res.status(400).json({
			message: 'Invalid request',
			errors: error.errors
		});
	}

	return res.status(error.status || 500).json({
		message: error.message || error.name || error,
	});
};
