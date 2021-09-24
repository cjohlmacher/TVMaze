/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const { data } = await axios.get("https://api.tvmaze.com/search/shows", {params: {
    q: query,
  }});
  return data.map( (showData) => {
    return {
      id: showData?.show?.id,
      name: showData?.show?.name,
      summary: showData?.show?.summary,
      image: showData.show.image ? showData.show.image.medium : "https://tinyurl.com/tv-missing",
    }
  })
};



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <img src=${show.image} class="card-img-top"/>
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);
    const episodeButton = createEpisodeButton();
    const castButton = createCastButton();
    $item.append(episodeButton);
    $item.append(castButton);
    $showsList.append($item);

  }
};

/* Create an Episode button */
function createEpisodeButton() {
  const $episodeButton = $('<button>Episodes</button>');
  $episodeButton.on('click', async function handleClick(e) {
    const id = e.target.parentElement.dataset.showId;
    const episodes = await getEpisodes(id);
    populateEpisodes(episodes);
  });
  return $episodeButton;
};

/* Create a Cast button */
function createCastButton() {
  const $castButton = $('<button>Cast</button>');
  $castButton.on('click', async function handleClick(e) {
    const id = e.target.parentElement.dataset.showId;
    const cast = await getActors(id);
    populateActors(cast);
  });
  return $castButton;
};


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();
  $("#actors-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const { data: returnedEpisodes } = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  $("#episodes-area").show();
  return returnedEpisodes.map( (episode) => {
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    }
  });

  // TODO: return array-of-episode-info, as described in docstring above
}

/*Populate episodes list*/

function populateEpisodes(episodes) {
  $("#episodes-list").empty();
  episodes.forEach( (episode) => {
    $("#episodes-list").append($(`<li>${episode.name}</li>`));
  });
};

/*Given a show ID, return list of actors:
* {id, name, character }
*/
async function getActors(id) {
  const { data: returnedActors } = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
  $("#actors-area").show();
  return returnedActors.map( (actor) => {
    return {
      id: actor.person.id,
      name: actor.person.name,
      character: actor.character.name,
    }
  })
};

/*Populate actors list*/

function populateActors(actors) {
  $("#actors-list").empty();
  actors.forEach( (actor) => {
    $("#actors-list").append($(`<li>${actor.name} as ${actor.character}</li>`));
  });
};
