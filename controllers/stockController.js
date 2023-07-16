import {nanoid} from "nanoid";
import Stock from "../models/StockModel.js"

export const getAllStocks = async (req, res) => {
    const stocks = await Stock.find({})
    res.status(200).json({stocks})
}

export const createStock = async (req, res) => {
        const {company, ceo} = req.body;
        const stock = await Stock.create({company, ceo})
        res.status(201).json({stock})
}

export const getStock = async (req, res) => {
    const {id} = req.params;
    const stock = await Stock.findById(id);
    if (!stock) {
        return res.status(404).json({msg: `No such stock found ${id}`});
    }
    res.status(200).json(stock)
}

export const updateStock = async (req, res) => {
    const {id} = req.params
    const updatedStock = await Stock.findByIdAndUpdate(id,req.body, {
        new: true
    })
    if (!updatedStock) {
        return res.status(404).json({msg: `No company with ${id} found`})
    }
    stock.ceo = ceo;
    stock.company = company;
    res.status(200).json({msg: "Stock modified", stocks: updatedStock})
}

export const deleteStock = async (req, res) => {
    const {id} = req.params
    const removedStock = await Stock.findByIdAndDelete(id)
    if (!removedStock) {
        return res.status(404).json({msg: `No company with ${id} found`})
    }
    res.status(200).json({msg: "Stock deleted", stocks: removedStock})
}