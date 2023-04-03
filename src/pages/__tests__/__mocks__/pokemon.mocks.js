export const allMock = {
  data: {
    locales: {
      edges: [
        {
          node: {
            ns: 'all-pokemon',
            data: '{"Pokédex":"Pokédex - Español"}',
            language: 'es'
          }
        },
        {
          node: {
            ns: 'index',
            data: '{"What Pokémon are you looking for?":"¿Qué Pokémon estás buscando?","Welcome to Pokédex":"Bienvenido a Pokédex","Search":"Buscar","Show all":"Mostrar todo","Home Page":"Página de Inicio"}',
            language: 'es'
          }
        },
        {
          node: {
            ns: '404',
            data: '{"Page not found":"Página no encontrada","Sorry 😔, we couldn’t find what you were looking for.":"Lo siento 😔, no pudimos encontrar la página que estabas buscando.","Try creating a page in ":"Intenta creando una página en ","Go home":"Ir al inicio"}',
            language: 'es'
          }
        },
        {
          node: {
            ns: 'pokemon',
            data: '{"Name: ":"Nombre ","Genus: ":"Género ","X: ":"Variante X ","Y: ":"Variante Y ","Number: ":"Número "}',
            language: 'es'
          }
        }
      ]
    },
    allPokemon: {
      nodes: [
        {
          id: 'pokemon-1',
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
          featuredImg: {
            childImageSharp: {
              gatsbyImageData: {
                layout: 'constrained',
                placeholder: {
                  fallback:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEqUlEQVR42u2T209bBRzHf7Qs2ZMxRl988MEXfTFLfHAvvuiDZjFmmulmNnVzEgaTFVjb09bS9tDraVd6unLoCvQCFHqjtGy9UOhpua3AwrhsIBvsAqOyDLfMZaggbc/POB/MYmL8A/wmv+T78vt8nz4A/+ffohgzg3zsHChHLH92nnLEDI05Ghon6P8GkLEUyIYMIB0wgCxN8aVpqpwY1JfXpBRlZI4GRdoE5nkHnL/h/udzcK352fWuMxC41Qyv1kjgY7cQhHE1r9oqBnFS92xAlNRCRZ8IyBz9jnyQ2tt2qxP6nyaBSOieBw6u9YFhtAZ8sy0Q2rDxo5v2cs+qdc+nDAHmdqJcktR+IM8aK4mk9tT3WaNLNmxE+eg5gXLKAspJC1+UUD8PHPtxBvTsFxBd6uL71qww8LMTevKt8LmdeJNgjYvktA0J1ojiIT1KMxSKBjQoGzY6ZWNGkI5T/ATJgiCuAOifCYB/jeb512jwr9D7ezeYW767Vkvf/Qtk8rHb7li0rJrnabTeaCk67zAF17pjV3fNXpCwhhIxpEdZ2nhEylJApPX8MzEFgP/XAfCt2/ndawx4883f9m06MLnlxOgTBl15FcZ+acFsobswsO3hhosezrdh43TzLSjNUiXlFI2K8aat2pDi9dqwEsQJbRl4t6PA2D4qs9i+BiZBXoo+asfYb8yOebmy4MxLdtmdjlJq14ehTQcXfmjnmDkDEqyBE6bUqF+4sKucpLH+Emmoi6lAlNLwYaTDzZsJ9sNcLLkvIZZg57we05ybizw2c1e4IPb+5OYCZjEX//Io+pdpdC2b8LsQwZ2OyFE5YSlIWD0Kooq2MxcVUJcgeRDyaPlhlwGCcVoYoSQYW2cKOQxy4wUvl9n1YOpeEhfOavHK4UrsZtXYmbegbYrEuqiEqwrJitVhKVYFiROVATFUBsV86Lhj5rtWTOBaMpoDDxlMcK7fh0tevFzyczkM4EgxjPH8BQwsm7Bnjcb2RT1GHjCcfVZVOtlRgV+5z6Qas417RTESKn0igI5rVJl1iQTLgvK1yPT5rbFZJ2ZvO4vDq26czHfj5GoXjt/pwmiORmtCgt4VEyaetnNdKyZ0zJFF25T6LW2mAahRFf+UXwTgmFXAxQkrL5Q7B5HL1v1D4y03R0faMMd6ShPZzlI23VbqS5nRFpNw9qsqLrXtxND985xjVl1wLuixfV5ndC1owLWg4dETWoDWORIy43bwzGj2dE7rQDNdL+zaMKF5UrIjj1cjyQqwMVNbYOZUSF8/i951Q8m9RBVNWaLYPKVE96LxUs+9Jui8ayxrnzf8ZcncmAfqwof5J90fQp33s4OORSUycw0o8VfcbghXPWqIVGPHMrXbdLV2t/V6I+pS9Uj4KnaMI/VoGBG0yYaOAhE/wmOmVH+rZ87IyswZGegHhS+1TVLXNbGzT45ZD7wttFcdk/lOP+heacL2BR3qWMGUwHFcqPLXon6wDgW+Q+/W9x4GaeQ47zmXD3bsgyrvJyDvPQX5HzZfnmCvvGjqUcP7pjdga3P7hezNWFNrjrJK+795pSZ8CLqHnAfC053vCdUngCSEgIjPQH8Ad9LRD1AYH2gAAAAASUVORK5CYII='
                },
                backgroundColor: 'transparent',
                images: {
                  fallback: {
                    src: '/static/2ec5c3271f4fdd3f9d13de05397660d9/443a8/1.png',
                    srcSet:
                      '/static/2ec5c3271f4fdd3f9d13de05397660d9/84030/1.png 50w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/3d34d/1.png 100w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/443a8/1.png 200w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/2a4a1/1.png 400w',
                    sizes: '(min-width: 200px) 200px, 100vw'
                  },
                  sources: [
                    {
                      srcSet:
                        '/static/2ec5c3271f4fdd3f9d13de05397660d9/dd425/1.webp 50w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/59d64/1.webp 100w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/d16d0/1.webp 200w,\n/static/2ec5c3271f4fdd3f9d13de05397660d9/b137e/1.webp 400w',
                      type: 'image/webp',
                      sizes: '(min-width: 200px) 200px, 100vw'
                    }
                  ]
                },
                width: 200,
                height: 200
              }
            }
          },
          locale: [
            {
              language: 'it',
              genus: 'Pokémon Seme',
              name: 'Bulbasaur',
              details: {
                x: 'Alla nascita gli è stato piantato sulla schiena un seme\nraro. La pianta sboccia e cresce con lui.',
                y: 'Dopo la nascita, cresce traendo nutrimento dal seme\npiantato sul suo dorso.'
              }
            },
            {
              language: 'es',
              genus: 'Pokémon Semilla',
              name: 'Bulbasaur',
              details: {
                x: 'Una rara semilla le fue plantada en el lomo al nacer.\nLa planta brota y crece con este Pokémon.',
                y: 'Después de nacer, crece alimentándose de las\nsemillas de su lomo.'
              }
            },
            {
              language: 'en',
              genus: 'Seed Pokémon',
              name: 'Bulbasaur',
              details: {
                x: 'A strange seed was planted on its back at birth.\nThe plant sprouts and grows with this Pokémon.',
                y: 'For some time after its birth, it grows by gaining\nnourishment from the seed on its back.'
              }
            }
          ]
        }
      ]
    }
  }
}
