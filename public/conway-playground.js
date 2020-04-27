function waitForConwayEngine(callback) {
    if (typeof ConwayJs !== 'undefined') return callback();
    setTimeout(waitForConwayEngine, 100, callback);
}
waitForConwayEngine(function () {
    var gameSize = { width: 60, height: 20 }
    var conwayPlayground = document.getElementById('conway-playground');
    conwayPlayground.width = gameSize.width
    conwayPlayground.height = gameSize.height
    conwayPlayground.style.imageRendering = 'pixelated'
    conwayPlayground.style.border = '1px solid #777'
    conwayPlayground.style.marginTop = '10px'
    conwayPlayground.style.width = '300px'
    conwayPlayground.style.height = '100px'
    conwayPlayground.style.verticalAlign = 'bottom'
    const ctx = conwayPlayground.getContext('2d')

    var game
    function createNewGame() {
        game = new ConwayJs({
            height: gameSize.height,
            width: gameSize.width,
            wrapOnEdges: true,
            enableLastTickInfo: true
        })
        // 2 ticks to avoid flash of cells at the start
        game.tick()
        game.tick()
        ctx.clearRect(0, 0, game.width, game.height)
        draw()
    }
    document.getElementById('conway-playground-reset').addEventListener('click', createNewGame, false)
    document.addEventListener('scroll', function() {
        if (!game && isScrolledIntoView(conwayPlayground)) createNewGame()
    }, false)
    if (isScrolledIntoView(conwayPlayground)) createNewGame()

    function draw() {
        ctx.fillStyle = '#333'
        for (let y = 0; y < game.height; y++) {
            for (let x = 0; x < game.width; x++) {
                const cell = game.world[y][x]
                if (cell.aliveLastTick === cell.alive) continue
                if (cell.alive) ctx.fillRect(x, y, 1, 1)
                else ctx.clearRect(x, y, 1, 1)
            }
        }
    }

    var fps = 10;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;
    function controlledFPS() {
        requestAnimationFrame(controlledFPS);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            if (game) {
                game.tick()
                draw()
            }
        }
    }
    controlledFPS()
})

function isScrolledIntoView(elem) {
    var docViewTop = window.scrollY;
    var docViewBottom = docViewTop + window.innerHeight;

    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.offsetHeight;

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}