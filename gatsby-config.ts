import type { GatsbyConfig } from "gatsby"
import * as languages from './src/data/languages'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `pokédex`,
    siteUrl: `https://www.yourdomain.tld`,
    languages
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "pokemon-source-plugin", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/favicon.png",
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: `gatsby-plugin-sass`,
    options: {
      additionalData: `@import "./src/styles/main.scss";`,
    },
  }, {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
        ],
      },
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    }, {
    resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `es`, `it`],
        defaultLanguage: `en`,
        siteUrl: `https://example.com`,
        // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
        trailingSlash: 'always',
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/',
            languages: [`en`, `es`, `it`]
          },
          {
            matchPath: '/pokemon',
            languages: [`en`, `es`, `it`]
          }
        ]
      }
  }]
};

export default config;
