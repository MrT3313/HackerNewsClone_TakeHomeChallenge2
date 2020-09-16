# Hacker News Clone
This is the second take home challenge given out by Lambda's engineering team to Lambda X students (students who have completed the program and are looking to land their first job in the industry). 

My main goal of this project is to continue expanding my test capabilities with React Testing Library and Jest. 

## **THE CHALLENGE**
Your challenge is to build a read-only clone of the hacker news frontend using that API.

---

## API
[Hacker News API Documentation](https://github.com/HackerNews/API)


# Versions
<details open>
<summary>0.1.0 - ContextAPI Setup & Homepage Component</summary>

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