const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{model: Product}]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:category_id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      category_id: req.params.category_id,
    },
    include: [{model: Product}]
  }).then ((categoryData) => res.json(categoryData));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_id: req.body.category_id,
    category_name: req.body.category_name,
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});
router.put('/:category_id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
      where: {
        category_id: req.params.category_id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory); })
    .catch((err) => res.json(err));
  });

router.delete('/:category_id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      category_id: req.params.category_id,
    },
  })
  .then ((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
