import mockFs from 'mock-fs';
import SteamLibrary from '../library-parser/SteamLibrary';

describe('steam library parses all games from manifests', () => {
    beforeEach(() => {
        mockFs({
            './steamapps/appmanifest_1234.acf': `
                "AppState"
                {
                    "appid"		"1234"
                    "name"		"Terraria"
                    "StateFlags"		"0"
                }`,
            './steamapps/appmanifest_5678.acf': `
                "AppState"
                {
                    "appid"		"5678"
                    "name"		"Satisfactory"
                    "StateFlags"		"4"
                }`,
            './steamapps/appmanifest_9012.acf': `
                "AppState"
                {
                    "appid"		"9012"
                    "name"		"Path of Exile"
                    "StateFlags"		"4"
                }`,
        });
    });
    afterEach(() => {
        mockFs.restore();
    });

    it('contains only installed games', () => {
        const library = new SteamLibrary();
        const games = library.getGames('./steamapps');
        expect(games.length).toEqual(2);
        expect(games[0]).toEqual({
            name: 'Satisfactory',
            heroPath: 'placeholder.png',
            exe: 'steam://rungameid/5678',
        });
        expect(games[1]).toEqual({
            name: 'Path of Exile',
            heroPath: 'placeholder.png',
            exe: 'steam://rungameid/9012',
        });
    });
});
