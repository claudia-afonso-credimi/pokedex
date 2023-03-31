// ○ Pokemon number - DONE
// ○ Pokemon name (in correct language) - DONE
// ○ Pokemon genus (in correct language) -
// ○ Pokemon description (in correct language) - DONE
// ○ Pokemon image -

const fetch = require('node-fetch')

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
    let resultsX = descriptions
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

    let resultsY = descriptions
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
      name,
      genus,
      details,
      // image: result.sprites.other.home.front_default,
      id: pokemon.id,
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
