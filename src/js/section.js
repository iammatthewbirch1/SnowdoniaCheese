const preventScrollMs = 900;
let scrollable;
let activeSection = document.getElementsByClassName('active')[0];

document.addEventListener( 'wheel', (evt) => {
    if(scrollable){
        scrollable = false;
        let dir = evt.deltaY > 0 ? 'right' : 'left';
        moveToNextSection(dir);
    }
}, { capture: false, passive: true });

setInterval(() => {
    scrollable = true;
}, preventScrollMs);

//add function to prevent longer scroll wheel actions --possibly determined by a high delta?
//add function to add key presses (arrows)
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
        activeSection = document.getElementById('section-'+activeSectionNo);
        activeSection.classList.add('active');
        activeSection.classList.remove('inactiveLeft');
        activeSection.classList.remove('inactiveRight');
    }

    console.log('Move To #'+activeSectionNo+' '+dir);
}