exports.createPages = ({ actions, graphql }) => {
  const createPage = actions.createPage
  const pages = graphql(`
    query {
      allPokemon {
        totalCount
        nodes {
          id
          imageUrl
          locale {
            language
            genus
            name
            details {
              x
              y
            }
          }
        }
      }
    }
  `).then((response) => {
    const pokemon = response
    const itemsPerPage = 10
    const numPages = Math.ceil(pokemon.data.allPokemon.totalCount / itemsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/page` : `/page/${i + 1}`,
        component: require.resolve('./src/templates/all-pokemon.tsx'),
        context: {
          limit: itemsPerPage,
          skip: i * itemsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    pokemon.data.allPokemon.nodes.forEach((el) => {
      const slug = el.id
      createPage({
        path: slug,
        component: require.resolve('./src/templates/pokemon.tsx'),
        context: { slug: slug },
      })
    })
  })

  return Promise.all([pages])
}
