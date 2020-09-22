// IMPORTS
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// ENDPOINTS
import endpoints from './endpoints.js'

// MAKE SERVER
// const getItemRequest = `${endpoints.HN_BASE_URL}${endpoints.item}/:id.json`
// console.log(getItemRequest)
const server = setupServer(

    // rest.get(getItemRequest, (req, res, ctx) => {
    rest.get(`${endpoints.HN_BASE_URL}${endpoints.item}:id.json`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
            // {message: 'this worked'}
            {
                title: 'Article_TITLE',
                by: 'Article_AUTHOR',
                url: 'https://article_url.com/',
                score: 100,
                time: 1600694957,
                descendants: 43,
            }
        ))
    }),
    // Fallback Catch 
    rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`)
        return res(
            ctx.status(500),
            ctx.json({error: "Pleade add request handler"})
        )
    })
)

// LISTENING
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers()) // resets handlers back to default state because you can mofidy them in each test

// EXPORTS
export { server, rest }