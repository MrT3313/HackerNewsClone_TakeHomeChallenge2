# Hacker News Clone

This is the second take home challenge given out by Lambda's engineering team to Lambda X students (students who have completed the program and are looking to land their first job in the industry). 

My main goal of this project is to continue expanding my test capabilities with React Testing Library and Jest. 

## **THE CHALLENGE**

Your challenge is to build a read-only clone of the hacker news frontend using that API.

---

## API

[Hacker News API Documentation](https://github.com/HackerNews/API)

## Approaches

1. Caching `ID Lists` and all `Story Data` on the initial load
    - Even though I was only encorporating the `TopStories` in version `0.1.0` the initial loadtime to fetch and loop through all the IDs and get their the individual data was `>30 seconds`.

2. Caching IDs and having the individual `<StoryCard />`'s fetch their own data
    - By offloading the fetching to individual `<StoryCard />`'s the initial loadtime is down to `<1-2 seconds`.
    - The downside is that there is a short flicker on the individual `<StoryCard />`'s while they fetch their own data when a user hits a new page or selects to view more posts on an individual page.

## Versions

<details open>
<summary>0.2.0 - Approach 2 - DynamicViews & Top Stories / New Stories / Ask Stories / Show Stories / Job Stories</summary>

- `Utils`
    1. `FETCH_data()` => a dynamic function used in the `useEffect` of all `StoryCard />` components to get their individual data. It accepts a `URL_base`, `URL_endpoint`, `unique_ID`, `URL_suffix`.
    2. `FETCH_ALL_IDs()` => a dynamic function that is used in the `<App />` component's `useEffect` to get all of the needed ID lists. It accepts a `URL_base` and an `endpoints` array. The function then maps through all the endpoints and returns an array of promises to be utilized by `Promise.all()`.

- `<DynamicView />`
    - This component has replaced all unique view components. It is called in the main `<App />` component's `Switch Router` and is recieving the appropriate ID List through `Render Props`.

- `CardCreator />`
    - This is a bridge component that is used to map over a list of IDs and render the appropriate component type that is passed through on props.

- `<StoryCard />`
    - `useEffect()` is using the `FETCH_data()` util function to get the unique data. This data is then set on the individual component's `useState` hook.

- `<App />`
    - `useEffect()` is using the `FETCH_ALL_IDs()` util function to get all of the ID lists. This data is then set on the `GlobalContext` object.
</details>

<details>
<summary>0.1.0 - Approach 1 - Setup & Homepage Component</summary>

### `useContext` & `useReducer` setup

- `Provider()`
    - Importing the main `GlobalContext` and wrapping its `children` in the `GlobalContext.Provider`.
    - `useReducer()`
        - the `Provider` is importing the `initialState`, an `actions` object, and a `reducer` function
        - the Global State (with all `useReducer` functinality) is then being passed into the `GlobalContext.Provider` through a `value` prop 
    ```javascript
    // Context > Provider.js
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
    - the `Provider` is then exported from `Context > Provider.js` and imported into `src > index.js` and rendered through the main `ReactDOM.render()` in order to provide the `GlobalContext` to whole SPA.
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

- `<App />`
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

- `<Homepage />`
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
