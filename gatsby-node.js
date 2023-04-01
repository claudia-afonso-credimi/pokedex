exports.createPages = async function ({ actions, graphql }) {
  const createPage = actions.createPage
  const { data } = await graphql(`
    query {
      allPokemon {
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
  `)
  data.allPokemon.nodes.forEach((el) => {
    const slug = el.id
    createPage({
      path: slug,
      component: require.resolve('./src/pages/pokemon.tsx'),
      context: { slug: slug },
    })
  })

  const items = data.allPokemon.nodes
  const itemsPerPage = 10
  const numPages = Math.ceil(items.length / itemsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/page` : `/page/${i + 1}`,
      component: require.resolve('./src/pages/all-pokemon.tsx'),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
