const fetch = require('node-fetch')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Details implements Node {
      x: String
      y: String
    }

    type Locale implements Node {
      language: String
      name: String
      genus: String
      details: Details
    }

    type Pokemon implements Node {
      id: Int!
      locale: [Locale]
    }

    type PokemonImages implements Node {
      imageUrl: String,
      id: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const pokemons = []
  const images = []
  const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species'
  const urlPokemon = 'https://pokeapi.co/api/v2/pokemon'

  for (let i = 1; i <= 151; i++) {
    pokemons.push(fetch(`${urlSpecies}/${i}`).then((res) => res.json()))
    images.push(fetch(`${urlPokemon}/${i}`).then((res) => res.json()))
  }

  const getPokemonImage = (pokemon) => {
    return pokemon.sprites.other.home.front_shiny
  }

  const getPokemonGenus = (genera) => {
    let results = genera
      .filter((el) => el.language.name === 'it' || el.language.name === 'es' || el.language.name === 'en')
      .map((filteredData) => {
        const language = {}
        const key = filteredData.language.name
        language[key] = filteredData.genus

        return language
      })
      .reduce((acc, lang) => {
        return { ...acc, ...lang }
      })

    return results
  }

  const getPokemonDescriptionAndVersion = (descriptions) => {
    const descriptionsX = [...descriptions]
    const descriptionsY = [...descriptions]

    let resultsX = descriptionsX
      .filter((el) => el.version.name === 'x')
      .filter(
        (versions) =>
          versions.language.name === 'it' || versions.language.name === 'es' || versions.language.name === 'en'
      )
      .map((filteredData) => {
        const language = {}
        const key = filteredData.language.name
        language[key] = filteredData.flavor_text

        return language
      })
      .reduce((acc, lang) => {
        return { ...acc, ...lang }
      })

    let resultsY = descriptionsY
      .filter((el) => el.version.name === 'y')
      .filter(
        (versions) =>
          versions.language.name === 'it' || versions.language.name === 'es' || versions.language.name === 'en'
      )
      .map((filteredData) => {
        const language = {}
        const key = filteredData.language.name
        language[key] = filteredData.flavor_text

        return language
      })
      .reduce((acc, lang) => {
        return { ...acc, ...lang }
      })

    return { x: resultsX, y: resultsY }
  }

  const getPokemonName = (names) => {
    let results = names
      .filter((lang) => lang.language.name === 'it' || lang.language.name === 'es' || lang.language.name === 'en')
      .map((filteredData) => {
        const language = {}
        const key = filteredData.language.name
        language[key] = filteredData.name

        return language
      })
      .reduce((acc, lang) => {
        return { ...acc, ...lang }
      })

    return results
  }

  const transformData = (pokemon) => {
    const name = getPokemonName(pokemon.names)
    const details = getPokemonDescriptionAndVersion(pokemon.flavor_text_entries)
    const genus = getPokemonGenus(pokemon.genera)

    const pokemonData = {
      id: pokemon.id,
      locale: [
        {
          language: 'it',
          name: name.it,
          genus: genus.it,
          details: {
            x: details.x.it,
            y: details.y.it,
          },
        },
        {
          language: 'es',
          name: name.es,
          genus: genus.es,
          details: {
            x: details.x.es,
            y: details.y.es,
          },
        },
        {
          language: 'en',
          name: name.en,
          genus: genus.en,
          details: {
            x: details.x.en,
            y: details.y.en,
          },
        },
      ],
    }

    return pokemonData
  }

  Promise.all(pokemons).then((results) => {
    const pokemonList = results.map((result) => {
      return transformData(result)
    })

    pokemonList.forEach((item) => {
      createNode({
        ...item,
        id: 'pokemon-' + item.id,
        internal: {
          type: 'Pokemon',
          contentDigest: createContentDigest(item),
        },
      })
    })
  })

  Promise.all(images).then((results) => {
    const pokemonImages = results.map((result) => {
      return getPokemonImage(result)
    })

    pokemonImages.forEach((image, index) => {
      createNode({
        imageUrl: image,
        id: 'pokemon-' + index,
        internal: {
          type: 'PokemonImages',
          contentDigest: createContentDigest(image),
        },
      })
    })
  })
}
