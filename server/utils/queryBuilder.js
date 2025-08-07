const applyQueryFilters = (modelQuery, queryParams) => {
  const { page = 1, limit = 10, search, brand, fromDate, toDate } = queryParams;

  // Search by car name or brand
  if (search) {
    modelQuery.find({
      $or: [
        { car_name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ],
    });
  }

  // Filter by brand
  if (brand) {
    modelQuery.find({ brand });
  }

  // Filter by createdAt date
  if (fromDate || toDate) {
    modelQuery.find({
      createdAt: {
        ...(fromDate && { $gte: new Date(fromDate) }),
        ...(toDate && { $lte: new Date(toDate) }),
      },
    });
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  modelQuery.skip(skip).limit(parseInt(limit));

  return modelQuery;
};

module.exports = applyQueryFilters;
