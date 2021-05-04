require('dotenv').config();
const { CLIENT_ID } = process.env;
const axios = require('axios');

module.exports = {

    getMechanics: async (req, res) => {
        let mechanicsArray = []
        await axios.get(`https://api.boardgameatlas.com/api/game/mechanics?client_id=${CLIENT_ID}`)
        .then(res => {
            // console.log(res.data)
            mechanicsArray = res.data.mechanics
        })
        return res.status(200).send(mechanicsArray)
        },
 
    getCategories: async (req, res) => {
        let categoriesArray = []
        await axios.get(`https://api.boardgameatlas.com/api/game/categories?client_id=${CLIENT_ID}`)
        .then(res => {
            // console.log(res.data)
            categoriesArray = res.data.categories
        })
        return res.status(200).send(categoriesArray)
        }
        
}