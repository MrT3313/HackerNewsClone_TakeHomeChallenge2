// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// COMPONENTS
import App from './App.js'

// CONTEXT
import ContextProvider from './Context/Provider.js'

// TESTS
afterEach(cleanup)

test('<App />', async () => {
    const { debug, getAllByTestId, getByTestId } = render(
        <MemoryRouter>
            <ContextProvider>
                <App />
            </ContextProvider>
        </MemoryRouter>
    )
    
    await waitForElement(() => getByTestId('DynamicView_rendered') )
    
    // HOME -- TOP STORIES
    const HOME_StoryCards = getAllByTestId('StoryCard_loading')
    expect(HOME_StoryCards.length).toBe(5)

    // NEW STORIES
    const NEW_nav = getByTestId('NavTo_NEW')
    fireEvent.click(NEW_nav)
    const NEW_StoryCards = getAllByTestId('StoryCard_loading')
    expect(NEW_StoryCards.length).toBe(4)

    // ASK STORIES
    const ASK_nav = getByTestId('NavTo_ASK')
    fireEvent.click(ASK_nav)
    const ASK_StoryCards = getAllByTestId('StoryCard_loading')
    expect(ASK_StoryCards.length).toBe(3)

    // SHOW STORIES
    const SHOW_nav = getByTestId('NavTo_SHOW')
    fireEvent.click(SHOW_nav)
    const SHOW_StoryCards = getAllByTestId('StoryCard_loading')
    expect(SHOW_StoryCards.length).toBe(2)

    // JOB STORIES
    const JOBS_nav = getByTestId('NavTo_JOBS')
    fireEvent.click(JOBS_nav)
    const JOBS_StoryCards = getAllByTestId('StoryCard_loading')
    expect(JOBS_StoryCards.length).toBe(1)

})