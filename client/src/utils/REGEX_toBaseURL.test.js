// IMPORTS
import React from 'react'
import { render, cleanup } from '@testing-library/react'

// FUNCTIONS
import REGEX_toBaseURL from './REGEX_toBaseURL.js'

// TESTS
afterEach(cleanup)
test('UTILS > REGEX_toBaseURL', () => {
    expect(REGEX_toBaseURL('https://fantasy.espn.com')).toBe('fantasy.espn.com')
    expect(REGEX_toBaseURL('https://bugzilla.mozilla.org/show_bug.cgi?id=22687')).toBe('bugzilla.mozilla.org')
    expect(REGEX_toBaseURL('https://jamesmcm.github.io/blog/2020/07/25/intro-dod/')).toBe('jamesmcm.github.io')
})