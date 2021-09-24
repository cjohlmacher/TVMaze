describe("testing of the API functions", function() {
    beforeEach(function () {
      // initialization logic
    });
  
    it('has searchShows function which returns shows matching a given query', async function () {
        let shows = await searchShows('alice');
        expect(shows.length).toBeGreaterThan(0);
        shows = await searchShows(2);
        expect(shows.length).toBeGreaterThan(0);
    });

    it('supplies a default image for a query result that does not have an image', async function() {
        let shows = await searchShows('girls');
        expect(shows[5].image).toEqual("https://tinyurl.com/tv-missing");
    });

    it('has getEpisodes function which returns episodes matching a given show id', async function () {
        let episodes = await getEpisodes(37002);
        expect(episodes.length).toEqual(6);
        expect(episodes[0].name).toEqual("Episode 1");
    });

    it('has getActors function which returns actors matching a given show id', async function () {
        let actors = await getActors(1367);
        expect(actors.length).toEqual(14);
        expect(actors[0].name).toEqual("Jamie Clayton");
        expect(actors[0].character).toEqual("Nomi Marks");
    });
  
    afterEach(function() {
        //clean-up
        $("#shows-list").empty();
        $("#episodes-list").empty();
        $("#episodes-area").hide();
        $("#actors-list").empty();
        $("#actors-area").hide();
    });
  });

describe("testing of the DOM updates", function() {
    beforeEach(function () {
      shows = [
          {id: 100, name: "Grey's Anatomy", summary: "A show about doctors", image: "https://static.tvmaze.com/uploads/images/medium_portrait/359/898261.jpg"},
          {id: 101, name: "Scandal", summary: "A show about presidential stuff", image: "https://tinyurl.com/tv-missing"}
      ];
      scandalEpisodes = [
        {id: 4315, name: "The One Where Olivia Breaks The Law", season: 7, episode: 193},
        {id: 68124, name: "The One Where Fitz is The Worst", season: 3, episode: 100}
      ];
      greysEpisodes = [
        {id: 315, name: "The One Where The Doctor Saves the Patient", season: 18, episode: 2314},
        {id: 467123, name: "The One Where The Elevator Breaks Down", season: 2, episode: 32}
      ]
      scandalActors = [
          {id: 12, name: "Kerry Washington", character: "Olivia Pope"},
      ]
      greysActors = [
          {id: 1, name: "Ellen Pompeo", character: "Meredith Grey"},
          {id: 15, name: "Patrick Dempsey", character: "McDreamy"},
          {id: 41, name: "Katherine Heigl", character: "Izzie Stevens"}
      ]
    });
  
    it('updates the DOM with show cards', async function () {
        populateShows(shows);
        expect($("#shows-list").children().length).toEqual(2);
    });

    it('updates the DOM with episodes', async function () {
        populateEpisodes(scandalEpisodes);
        expect($("#episodes-list").children().length).toEqual(2);
    });

    it('clears the episode list each time a new list is generated', function() {
        populateEpisodes(scandalEpisodes);
        expect($("#episodes-list").children().length).toEqual(2);
        populateEpisodes(greysEpisodes);
        expect($("#episodes-list").children().length).toEqual(2);
    });
  
    it('updates the DOM with actors', async function () {
        populateActors(scandalActors);
        expect($("#actors-list").children().length).toEqual(1);
    });

    it('clears the actors list each time a new list is generated', function() {
        populateActors(scandalActors);
        expect($("#actors-list").children().length).toEqual(1);
        populateActors(greysActors);
        expect($("#actors-list").children().length).toEqual(3);
    });

    afterEach(function() {
        //clean-up
        $("#shows-list").empty();
        $("#episodes-list").empty();
        $("#episodes-area").hide();
        $("#actors-list").empty();
        $("#actors-area").hide();
    });
  });