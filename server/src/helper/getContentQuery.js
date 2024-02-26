const getContentQuery = async (
  contentType,
  startIndex,
  limit,
  adult,
  Content
) => {
  const total = await Content.countDocuments({ type: contentType });

  let content = [];
  if (adult) {
    content = await Content.find({ type: contentType })
      .limit(Number(limit))
      .skip(startIndex);
  } else {
    content = await Content.find({
      type: contentType,
      rating: { $ne: "R" },
    })
      .limit(Number(limit))
      .skip(startIndex);
  }

  return {
    total,
    results: content,
  };
};

export default getContentQuery;
