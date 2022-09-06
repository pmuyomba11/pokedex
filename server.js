// REQUIRE DEPENDENCIES
const express = require('express');
const methodOverride = require("method-override");
const pokemon = require('./models/pokemon.js');  

// INITIALIZE EXPRESS APP
const app = express();
const port = 3000;


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))


// DEFINE OUR ROUTES -- INDUCE
// [I]NDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        pokemon: pokemon
    });
});


// [N]EW
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

// [D]
app.delete("/pokemon/:index", (req, res) => {
    pokemon.splice(req.params.index, 1)
    res.redirect("/pokemon")
})

// [U]PDATE
function Pokemon(paramater) {
    this.id = paramater.id,
    this.name = paramater.name,
    this.img = paramater.img,
    this.type = [paramater.type
    ],
    this.stats = {
      hp: paramater.hp,
      attack: paramater.attack,
      defense: paramater.defense,
      spattack: paramater.spattack,
      spdefense: paramater.spdefense,
      speed: paramater.speed,
    },
    this.damages = {
        normal: paramater.normal,
        fire: paramater.fire,
        water: paramater.water,
        electric: paramater.electric,
        grass: paramater.grass,
        ice: paramater.ice,
        fight: paramater.fight,
        poison: paramater.poison,
        ground: paramater.ground,
        flying: paramater.flying,
        psychic: paramater.psychic,
        bug: paramater.bug,
        rock: paramater.rock,
        ghost: paramater.ghost,
        dragon: paramater.dragon,
        dark: paramater.dark,
        steel: paramater.steel,
      },
      this.misc = {
        abilities: {
          normal: [
          ],
          hidden: paramater.hidden
        },
        classification: paramater.classification,
        height: paramater.height,
        weight: paramater.weight,
      }
    }


app.put("/pokemon/:index", (req, res) => {  
    const updatedPokemon = new Pokemon(req.body);
    pokemon[req.params.index] = updatedPokemon
    res.redirect("/pokemon")
})

// [CREATE
app.post("/pokemon", (req, res) => {
    const newPokemon = new Pokemon(req.body)
    pokemon.push(newPokemon);
    res.redirect("/pokemon")
})

// [E]
app.get("/pokemon/:index/edit", (req, res) => {
    res.render(
        "edit.ejs", {
        pokemon: pokemon[req.params.index],
        index: req.params.index,
    }
    )
})

// [S]HOW
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {
        pokemon: pokemon[req.params.id]
    })
})

// LISTEN ON PORT...
app.listen(port, () => {
    console.log(`listening on port `, port)
});