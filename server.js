import express from "express"
import morgan from "morgan";
import * as dotenv from "dotenv";
import {nanoid} from "nanoid";
dotenv.config()

const app = express()

let stocks = [
    {id: nanoid(), company: "Google", ceo:"Sundar Pichai"},
    {id: nanoid(), company: "Apple", ceo:"Tim Cook"}
]

if (process.env.NODE_ENV === "development"){
app.use(morgan('dev'))
}

app.use(express.json())

app.get("/", (req,res) => {
    console.log(req)
    res.json({message: "Here on get request :)", data: req.body})
})

app.get("/api/v1/stocks", (req,res) => {
    res.status(200).json({stocks})
})

app.post("/api/v1/stocks", (req,res) => {
    const {company, ceo} = req.body;
    if (!company || !ceo){
        return res.status(400).json({msg: "Please provide company and ceo"})
    }
    const id = nanoid(10)
    const stock = { id, company, ceo}
    stocks.push(stock)
    res.status(200).json({stock})
})

app.get("/api/v1/stock/:id", (req,res) => {
    const {id} = req.params;
    const stock = stocks.find((stock)=> stock.id === id);
    if (!stock) {
        return res.status(404).json({msg:`No such stock found ${id}`});
    }
    res.status(200).json(stock)
})

app.patch("/api/v1/stocks/:id", (req, res) => {
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
})

app.delete("/api/v1/stocks/:id", (req, res) => {
    const {id} = req.params
    const stock = stocks.find(stock=> stock.id === id)
    if (!stock){
        return res.status(404).json({msg: `No company with ${id} found`})
    }
    const newStocks = stocks.filter((stock)=> stock.id === id)
    stocks = newStocks
    res.status(200).json({msg:"Stock deleted"})
})

const port = process.env.PORT || 5100
app.listen(port, (()=> console.log(`Server running on Port:${port} ... `)))