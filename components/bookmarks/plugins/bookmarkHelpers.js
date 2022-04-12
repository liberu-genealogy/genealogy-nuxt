const matches = (first, second) => first.name === second.name
    && Object.keys(first.params)
        .every(key => first.params[key] == second.params[key])
    && Object.keys(first.query)
        .every(key => first.query[key] == second.query[key]);

const qualifies = (bookmarks, bookmark) => bookmark && bookmark.name
    && !bookmark.meta.guestGuard
    && !bookmarks.some(existing => matches(existing, bookmark));

const map = bookmark => ({
    name: bookmark.name,
    meta: JSON.parse(JSON.stringify(bookmark.meta)),
    params: JSON.parse(JSON.stringify(bookmark.params)),
    query: JSON.parse(JSON.stringify(bookmark.query)),
    sticky: false,
    state: null,
});

const index = (bookmarks, bookmark) => bookmarks.findIndex(existing => matches(existing, bookmark));

const stickies = bookmarks => bookmarks.filter(({ sticky, state }) => sticky || state);

const persist = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(stickies(bookmarks)));
};

export {
    qualifies, matches, stickies, map, index, persist,
};
