// IMPORTS
import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// COMPONENTS
import Navbar from './NavBar.js'

// TESTS
afterEach(cleanup)

test('<Navbar />', async () => {
    const { debug, getAllByTestId, getByTestId } = render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    )

    const HOME_nav = getByTestId('NavTo_HOME')
    expect(HOME_nav).toHaveAttribute('href', '/')

    const NEW_nav = getByTestId('NavTo_NEW')
    expect(NEW_nav).toHaveAttribute('href', '/newest')

    const PAST_nav = getByTestId('NavTo_PAST')
    expect(PAST_nav).toHaveAttribute('href', '/past')
    
    const COMMENTS_nav = getByTestId('NavTo_COMMENTS')
    expect(COMMENTS_nav).toHaveAttribute('href', '/newcomments')
    
    const ASK_nav = getByTestId('NavTo_ASK')
    expect(ASK_nav).toHaveAttribute('href', '/ask')
    
    const SHOW_nav = getByTestId('NavTo_SHOW')
    expect(SHOW_nav).toHaveAttribute('href', '/show')

    const JOBS_nav = getByTestId('NavTo_JOBS')
    expect(JOBS_nav).toHaveAttribute('href', '/jobs')

    const SUBMIT_nav = getByTestId('NavTo_SUBMIT')
    expect(SUBMIT_nav).toHaveAttribute('href', '/submit')
})