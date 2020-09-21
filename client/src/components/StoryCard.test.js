// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'

// COMPONENTS
import StoryCard from '../components/StoryCard.js'

// SETUP
fetch = require('jest-fetch-mock')

// TESTS
afterEach(cleanup)

test('<StoryCard />', async () => {
    fetch.mockResponseOnce(JSON.stringify({
        title: 'Article_TITLE',
        by: 'Article_AUTHOR',
        url: 'https://article_url.com/',
        score: 100,
        time: 1600694957,
        descendants: 43,
    }))

    const { debug, getByTestId } = render(<StoryCard />)
    await waitForElement(() => getByTestId('StoryCard_rendered'))

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