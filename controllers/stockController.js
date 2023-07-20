import Stock from "../models/StockModel.js"
import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllStocks = async (req, res) => {
    console.log(req.user)
    const stocks = await Stock.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({stocks})
}

export const createStock = async (req, res) => {
        req.body.createdBy = req.user.userId
        const stock = await Stock.create(req.body)
        res.status(StatusCodes.CREATED).json({stock})
}

export const getStock = async (req, res) => {
    const {id} = req.params;
    const stock = await Stock.findById(id);
    res.status(StatusCodes.OK).json({stock})
}

export const updateStock = async (req, res) => {
    const {id} = req.params
    const updatedStock = await Stock.findByIdAndUpdate(id,req.body, {
        new: true
    })
    res.status(StatusCodes.OK).json({msg: "Stock modified", stocks: updatedStock})
}

export const deleteStock = async (req, res) => {
    const {id} = req.params
    const removedStock = await Stock.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg: "Stock deleted", stocks: removedStock})
}

export const showStats = async (req, res) => {
    let stats = await Stock.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$stockStatus', count: { $sum: 1 } } },
    ])
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});
    const defaultStats = {
        "Available": stats["Available"] || 0,
        "Not-available": stats["Not-available"] || 0,
        "In-progress": stats["In-progress"] || 0
    };
    let monthly = await Stock.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    monthly = monthly.map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, count };
        })
        .reverse();
    res.status(StatusCodes.OK).json({defaultStats, monthly})
}
