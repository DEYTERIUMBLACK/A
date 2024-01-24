let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uri = "mongodb+srv://vrasdasd707:ramal123@cluster0.ohtiost.mongodb.net/?retryWrites=true&w=majority";
app.use(cors());
app.use(bodyParser.json());
let port = 3001;
const ProductsSchema = new Schema({
  name: String,
  image: String,
  price: Number,
});
const Products = mongoose.model("Products", ProductsSchema);

app.get("/api/products", async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("data not found");
  }
});

app.get("/api/products/:id", async (req, res) => {
  let { id } = req.params;
  let Found = await Products.findById(id);
  if (Found) {
    res.send(Found);
  } else {
    res.send("data not found");
  }
});

app.delete("/api/products/:id", async (req, res) => {
  let { id } = req.params;
  let Deleted = await Products.findByIdAndDelete(id);
  if (Deleted) {
    res.send(Deleted);
  } else {
    res.send("data not found");
  }
});

app.post("/api/products", async (req, res) => {
  let { name, image, price } = req.body;
  let newData={}
  if (name) {
    newData.name = name
  }
  if (image) {
    newData.image = image
  }
  if (price) {
    newData.price = price
  }
  let newProduct =await new Products(newData)
  let savedProduct = await newProduct.save()
  res.send(savedProduct)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


mongoose.connect(uri)
.then(() => console.log('Mongo hazirdir!'));