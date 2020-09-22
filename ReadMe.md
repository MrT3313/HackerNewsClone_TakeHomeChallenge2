# Hacker News Clone

This is the second take home challenge given out by Lambda's engineering team to Lambda X students (students who have completed the program and are looking to land their first job in the industry).

My main goal of this project is to continue expanding my test capabilities with React Testing Library and Jest.

## **THE CHALLENGE**

Your challenge is to build a read-only clone of the hacker news frontend using that API.

### Live Project Link
🖥 [Live Project](https://turgeon-hackernews-clone.netlify.app/) 🖥

---

## API

[Hacker News API Documentation](https://github.com/HackerNews/API)

## Approaches

1. Caching `ID Lists` and all `Story Data` on the initial load
    - Even though I was only encorporating the `TopStories` in version `0.1.0` the initial loadtime to fetch and loop through all the IDs and get their the individual data was `>30 seconds`.

2. Caching `ID Lists` and having the individual `<StoryCard />`'s fetch their own data
    - By offloading the fetching to individual `<StoryCard />`'s the initial loadtime is down to `<1-2 seconds`.
    - The downside is that there is a short flicker on the individual `<StoryCard />`'s while they fetch their own data when a user hits a new page or selects to view more posts on an individual page.

## Versions

<details open>
<summary>0.3.0 - Testing w/ React Testing Library & Mock Service Worker</summary>

### Approaches

1. I initially started with **[jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock)** in order to fake HTTP requests & responses. This worked well with individual components but when it got to the higher level `<App />` component I was struggling to interpret the error messages I was getting.

2. After doing more research I came across this article from the esteemed Kent C. Dodds: [Stop Mocking Fetch](https://kentcdodds.com/blog/stop-mocking-fetch). Ironically this came on the same day that I heard Elon Musk mention that one of the biggest mistakes he sees smart engineers make is 'optomizing something that should not exist'. This naturally led me to asking, `well Mr. Dodds if mock fetching should not exist ... what should I do?!` His answer: **[Mock Service Worker](https://mswjs.io/)**.

### Mock Service Worker (MSW)

1. Mocking response from the HackerNews API `item` endpoint => returning OBJECT.

    ```javascript
    // Get Item - OBJECT
    rest.get(`${endpoints.HN_BASE_URL}${endpoints.item}:id.json`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(
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
    ```

2. Mocking response from each HackerNews API `IDs` endpoint => each is returning an ARRAY of DIFFERENT lengths. The different lengths are used to test if the `<NavBar />` component is correctly routing and rendering the appropriate number of cards.

    ```javascript
    // Get IDs - ARRAY
    // - 1 - // Top Stories
    rest.get(`${endpoints.HN_BASE_URL}${endpoints.topStories}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([1,2,3,4,5]))
    }),
    // ...
    ```

3. In order to make sure that an error on my end does not let any API fetch calls go out to an actual server I added a `Fallback Handler` in the test server.

    ```javascript
    // Fallback Handler
     rest.get('*', (req, res, ctx) => {
         console.error(`Please add request handler for ${req.url.toString()}`)
         return res(
             ctx.status(500),
             ctx.json({error: "Pleade add request handler"})
         )
     })
    ```

### Tests

1. `<NavBar />`
    - Testing all `href` attributes.
2. `<StoryCard />`
    - Happy Path: ✅ - All data appropriatly rendered.
    - Missing Data: ✅ - Appropriate conditional rendering.
3. `<DynamicView />`
    - Passing an `IDs Array` and testing if the correct number of `loading` & `rendered` cards are rendered.
4. `<App />`
    - Having mocked all the return arrays in the `MSW test server` we are selecting each `<NavLink />` from the `<NavBar />`and testing to make sure the correct number of `<StoryCard />'s` are rendered for each route.

</details>

<details>
<summary>0.2.0 - Approach 2 - DynamicViews & Top Stories / New Stories / Ask Stories / Show Stories / Job Stories</summary>

### Utils

1. `FETCH_data()` => a dynamic function used in the `useEffect` of all `<StoryCard />` components to get their individual data. It accepts a `URL_base`, `URL_endpoint`, `unique_ID`, `URL_suffix`.

2. `FETCH_ALL_IDs()` => a dynamic function that is used in the `<App />` component's `useEffect` to get all of the needed ID lists. It accepts a `URL_base` and an `endpoints` array. The function then maps through all the endpoints and returns an array of promises to be utilized by `Promise.all()`.

### Components

1. `<DynamicView />`
    - This component has replaced all unique view components. It is called in the main `<App />` component's `Switch Router` and is recieving the appropriate ID List through `Render Props`.

2. `<CardCreator />`
    - This is a bridge component that is used to map over a list of IDs and render the appropriate component type that is passed through on props.

3. `<StoryCard />`
    - `useEffect()` is using the `FETCH_data()` util function to get the unique data. This data is then set on the individual component's `useState` hook.

4. `<App />`
    - `useEffect()` is using the `FETCH_ALL_IDs()` util function to get all of the ID lists. This data is then set on the `GlobalContext` object.

</details>

<details>
<summary>0.1.0 - Approach 1 - Context API Setup & Homepage Component</summary>

### Context API

1. `Provider()` function
    - Importing the main `GlobalContext` and wrapping its `children` in the `GlobalContext.Provider`.
2. `useReducer()` hook
    - the `Provider` is importing the `initialState`, an `actions` object, and a `reducer` function.
    - the `GlobalContext.Provider` is accepting all `useReducer` functinality through the passed `value` prop.

    ```javascript
        // Context > Provider.js
        // IMPORTS
        // useReducer
        import initialState from '../useReducer/initialState.js'
        import actions from '../useReducer/actions.js'
        import reducer from '../useReducer/reducer.js'

        // CONTEXT
        import GlobalContext from '../Context/GlobalContext.js'

        // EXPORT
        export default function({children}) {
            const [ state, dispatch ] = useReducer(reducer, initialState)
            const value = {
                topStory_IDs: state.topStory_IDs,
                setTopStory_IDs: storyIDs => {
                    dispatch({
                        type: actions.setTopStory_IDs,
                        value: storyIDs
                    })
                },

                storyData: state.storyData,
                setStoryData: storyData => {
                    dispatch({
                        type: actions.setStoryData,
                        value: storyData
                    })
                },
            }

            return (
                <GlobalContext.Provider value={value}>
                    {children}
                </GlobalContext.Provider>
            )
        }
    ```

3. `src > index.js` render
    - importing the `Provider()` as `<ContextProvider />` from `Context > Provider.js` and rendering it through the main `ReactDOM.render()` in order to provide the `GlobalContext` to whole SPA.

    ```javascript
    // src > index.js
        ReactDOM.render(
            <React.StrictMode>
                <Router>
                    <ContextProvider>
                        <App />
                    </ContextProvider>
                </Router>
            </React.StrictMode>,
            document.getElementById('root')
        );
    ```

### Components

1. `<App />`
    - Once the `<App />` loads it: 
        1. Fetches the `topStories` => recieves array of `itemIDs`
            - Updates the `topStory_IDs` on the `GlobalContext` through a `setTopStory_IDs` function that dispatches an update action
        2. Loops through the `itemIDs` and gets the individual story details
            - story details are added to a prep object object based on the `itemID`:

                ```javascript
                    prepObject = {
                        itemID: storyData
                    }
                ```

                - This is done that that individual story details can be recieved in `O(1)` time when needed.
        3. Updates the `storyData` on the `GlobalContext` with the prep object through a `setStoryData` function that dispatches an update action.  
        4. Upates the `<App />` loading state to `false` and the main SPA router is hit, rendering the `<Homepage />`

2 `<Homepage />`
    - Uses `useContext` and the `GlobalContext` to recieve the `topStory_IDs` array & the `storyData` object
    - After accounting for pagination the `currentPosts` are mapped and the indvidual story data is recieved in `O(1)` time from the `storyData` object and passed to `<StoryCard />` to render the individual details

</details>
<details>
<summary>0.0.1 - Create React App</summary>

- Cleaned out template CRA
- `<App/>` rendering 'Hello World' 
</details>

# Assets

| name              | source |
| ---               | ---    |
| Y Combinator Logo | [seeklogo.com](https://seeklogo.com/vector-logo/274103/y-combinator) |
