// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
/* Mock Service Worker => setup in 'src > setupTests.js' */

// COMPONENTS
import StoryCard from '../components/StoryCard.js'

// TESTS
afterEach(cleanup)

test('<StoryCard />', async () => {
    // Render
    const { debug, getByTestId } = render(<StoryCard id={12345} idx={5}/>)
    
    // Test Loading State
    const StoryCard_loading = getByTestId('StoryCard_loading')
    debug(StoryCard_loading)
    
    // Wait for Mock
    const StoryCard_rendered = await waitForElement(() => getByTestId('StoryCard_rendered'))
    debug(StoryCard_rendered)

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