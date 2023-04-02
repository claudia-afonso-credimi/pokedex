const axios = require('axios')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Details implements Node {
      x: String!
      y: String!
    }

    type Locale implements Node {
      language: String
      name: String!
      genus: String!
      details: Details
    }

    type PokemonImages implements Node {
      featuredImg: File @link(from: "fields.localFile")
    }

    type Pokemon implements Node {
      id: String!
      imageUrl: String!
      locale: [Locale]
      featuredImg: File @link(from: "fields.localFile")
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species'
  const urlPokemon = 'https://pokeapi.co/api/v2/pokemon'

  const fetchPokemonData = async (i) => {
    return axios.get(`${urlSpecies}/${i}`)
  }

  const fetchPokemonImage = async (i) => {
    return axios.get(`${urlPokemon}/${i}`)
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
            y: details.y.it
          }
        },
        {
          language: 'es',
          name: name.es,
          genus: genus.es,
          details: {
            x: details.x.es,
            y: details.y.es
          }
        },
        {
          language: 'en',
          name: name.en,
          genus: genus.en,
          details: {
            x: details.x.en,
            y: details.y.en
          }
        }
      ]
    }

    return pokemonData
  }

  for (let i = 1; i <= 151; i++) {
    const pokemonData = await fetchPokemonData(i)
    const pokemonImageData = await fetchPokemonImage(i)

    const pokemon = transformData(pokemonData.data)
    const pokemonImage = pokemonImageData.data.sprites.other.home.front_shiny

    createNode({
      ...pokemon,
      id: 'pokemon-' + pokemon.id,
      imageUrl: pokemonImage,
      internal: {
        type: 'Pokemon',
        contentDigest: createContentDigest(pokemon)
      }
    })
  }
}

exports.onCreateNode = async ({ node, actions: { createNode, createNodeField }, createNodeId, getCache }) => {
  // For all Pokemon nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === 'Pokemon' && node.imageUrl !== null) {
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      getCache
    })
    // if the file was created, extend the node with "localFile"
    if (fileNode) {
      createNodeField({ node, name: 'localFile', value: fileNode.id })
    }
  }
}
