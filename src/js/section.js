document.addEventListener('DOMContentLoaded', () => {

    const preventScrollMs = 900;
    const backgroundOffset = -85;
    const numberOfSections = 5; 
    const backgroundEl = document.getElementById('backgroundIMG');

    let scrollable;
    let activeSection = document.getElementsByClassName('active')[0];
    let sectionWrap = document.getElementsByClassName('section-wrapper')[0];

    // Listeners
    document.addEventListener( 'wheel', (evt) => {
        if(scrollable){
            scrollable = false;
            let dir = evt.deltaY > 0 ? 'right' : 'left';
            moveToNextSection(dir);
        }
    }, { capture: false, passive: true });

    document.addEventListener('keydown', checkKey);

    swipedetect(sectionWrap, function(swipedir){
        // swipedir contains either "none", "left", "right", "up", or "down"
        switch (swipedir) {
            case 'none':
                break;
            case 'up':
                moveToNextSection('right');
                break;
            case 'down':
                moveToNextSection('left');
                break;
            case 'right':
                moveToNextSection('left');
                break;
            case 'left':
                moveToNextSection('right');
        }
    });



    setInterval(() => {
        scrollable = true;
    }, preventScrollMs);

    //add function to prevent longer scroll wheel actions --possibly determined by a high delta?
    //add function to add key presses (arrows)
    function checkKey(e){
        e = e || window.event;

        switch (e.keyCode) {
            case 38:
                //up - move left
                moveToNextSection('left');
                break;
            case 40:
                //down - move right
                moveToNextSection('right');
                break;
            case 37:
                //left - move left
                moveToNextSection('left');
                break;
            case 39:
                //right - move right
                moveToNextSection('right');
                break;
        
            default:
                break;
        }
    }
    
    //add function to handle touch events (drag library? --touch.js)


    function moveToNextSection(dir){
        let moveSection = false;
        let activeSectionNo = activeSection.getAttribute('id').slice(-1);

        console.log('Move From #'+activeSectionNo+' '+dir);

        if(dir === 'right' && activeSectionNo < 5) {
            activeSectionNo++;
            moveSection = true;
            activeSection.classList.remove('active');
            activeSection.classList.add('inactiveLeft');
        } else if(dir === 'left' && activeSectionNo > 1) {
            activeSectionNo--;
            moveSection = true;
            activeSection.classList.remove('active');
            activeSection.classList.add('inactiveRight');
        }

        if(moveSection){
            backgroundEl.style.left = (backgroundOffset * (numberOfSections - activeSectionNo)) + 'px';
            activeSection = document.getElementById('section-'+activeSectionNo);
            activeSection.classList.add('active');
            activeSection.classList.remove('inactiveLeft');
            activeSection.classList.remove('inactiveRight');
        }

        console.log('Move To #'+activeSectionNo+' '+dir);
    }
    
});