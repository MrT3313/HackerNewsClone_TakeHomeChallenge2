// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { server, rest } from '../utils/testServer.js'

// COMPONENTS
import StoryCard from './StoryCard.js'

// ENDPOINTS
import endpoints from '../utils/endpoints.js'

// TESTS
afterEach(cleanup)

test('<StoryCard /> Happy Path', async () => {
    // Render
    const { debug, getByTestId } = render(<StoryCard id={12345} idx={5}/>)
    
    // Test Loading State
    const StoryCard_loading = getByTestId('StoryCard_loading')
    // debug(StoryCard_loading)
    
    // Wait for Mock
    const StoryCard_rendered = await waitForElement(() => getByTestId('StoryCard_rendered'))
    // debug(StoryCard_rendered)

    const title = getByTestId('title')
    expect(title.textContent).toBe('Article_TITLE')
    expect(title.href).toBe('https://article_url.com/')

    const author = getByTestId('author')
    expect(author.textContent).toBe('by Article_AUTHOR')

    const base_URL = getByTestId('base_URL')
    expect(base_URL.textContent).toBe('( article_url.com )')
    
    const score = getByTestId('score')
    expect(score.textContent).toBe(`100 points`)
    
    const descendants = getByTestId('descendants')
    expect(descendants.textContent).toBe(`43 comments`)
})

test('<StoryCard /> Missing Data', async () => {
    // server.use => overwrite main testServer route handler for: Get Item
    // Get Item - OBJECT - Missing Data
    server.use(
        rest.get(`${endpoints.HN_BASE_URL}${endpoints.item}:id.json`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(
                {
                    title: 'Article_TITLE',
                    by: 'Article_AUTHOR',
                    // url: 'https://article_url.com/',
                    score: 100,
                    time: 1600694957,
                    // descendants: 43,
                }
            ))
        })
    )

    // Render
    const { debug, getByTestId } = render(<StoryCard id={12345} idx={5}/>)

    // Test Loading State
    const StoryCard_loading = getByTestId('StoryCard_loading')
    // debug(StoryCard_loading)
    
    // Wait for Mock
    const StoryCard_rendered = await waitForElement(() => getByTestId('StoryCard_rendered'))
    // debug(StoryCard_rendered)
})