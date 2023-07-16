import {nanoid} from "nanoid";
import Stock from "../models/StockModel.js"

let stocks = [
    {id: nanoid(), company: "Google", ceo:"Sundar Pichai"},
    {id: nanoid(), company: "Apple", ceo:"Tim Cook"}
]

export const getAllStocks = async (req,res) => {
    res.status(200).json({stocks})
}

export const createStock = async (req,res) => {
    const {company, ceo} = req.body;
    const stock = await Stock.create({company, ceo})

    res.status(201).json({stock})
}

export const getStock = async (req,res) => {
    const {id} = req.params;
    const stock = stocks.find((stock)=> stock.id === id);
    if (!stock) {
        return res.status(404).json({msg:`No such stock found ${id}`});
    }
    res.status(200).json(stock)
}

export const updateStock = async (req, res) => {
    const {company, ceo} = req.body;
    if (!company || !ceo){
        return res.status(400).json({msg: "Please provide company and ceo"})
    }
    const {id} = req.params
    const stock = stocks.find(stock=> stock.id === id)
    if (!stock){
        return res.status(404).json({msg: `No company with ${id} found`})
    }
    stock.ceo = ceo;
    stock.company = company;
    res.status(200).json({msg:"Stock modified",stock})
}

export const deleteStock = async (req, res) => {
    const {id} = req.params
    const stock = stocks.find(stock=> stock.id === id)
    if (!stock){
        return res.status(404).json({msg: `No company with ${id} found`})
    }
    const newStocks = stocks.filter((stock)=> stock.id === id)
    stocks = newStocks
    res.status(200).json({msg:"Stock deleted"})
}