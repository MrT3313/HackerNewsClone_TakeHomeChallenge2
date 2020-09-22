// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// COMPONENTS
import DynamicView from './DynamicView.jsx'

// CONTEXT
import ContextProvider from '../Context/Provider.js'

// TESTS
afterEach(cleanup)

test('<DynamicView />', async () => {
    const { debug, getAllByTestId, getByTestId } = render(
        <MemoryRouter>
            <ContextProvider>
                <DynamicView IDs={[1,2,3]}/>
            </ContextProvider>
        </MemoryRouter>
    )

    const StoryCards_loading = getAllByTestId('StoryCard_loading')
    expect(StoryCards_loading.length).toBe(3)
    // debug(StoryCards_loading)
    
    // Wait for Mock
    const StoryCards_rendered = await waitForElement(() => getAllByTestId('StoryCard_rendered'))
    expect(StoryCards_rendered.length).toBe(3)
    // debug(StoryCards_rendered)
})