import { generateProductsMocks } from "../mocks/product.mock.js";
import productsServices from "../services/products.services.js";

const getAll = async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };

    if (status) {
      const products = await productsServices.getAll({ status: status }, options);
      return res.status(200).json({ status: "success", products });
    }

    if (category) {
      const products = await productsServices.getAll({ category: category }, options);
      return res.status(200).json({ status: "success", products });
    }

    const products = await productsServices.getAll({}, options);

    res.status(200).json({ status: "success", products });
  } catch (error) {
    logger.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};

const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsServices.getById(pid);
    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    logger.log(error);
    next(error);
  }
};

const create = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.create(product, req.user);

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    //console.log(error);
    logger.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};

const update = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;

    const updateProduct = await productsServices.update(pid, productData);
    if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });

    res.status(200).json({ status: "success", payload: updateProduct });
  } catch (error) {
    logger.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsServices.deleteOne(pid, req.user);
    if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el id ${pid} no encontrado` });

    res.status(200).json({ status: "success", payload: "Producto eliminado" });
  } catch (error) {
    logger.log(error);
    next(error);
    //res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};

const createProductsMocks = async (req, res) => {
    const products = generateProductsMocks(100);
    return res.status(201).json({ status: "Success", products });

};

export default {
  getAll,
  getById,
  update,
  deleteOne,
  create,
  createProductsMocks,
};
