const timeout = 900;
let scrollable;
let i = 0;

document.addEventListener( 'wheel', (evt) => {
    if(scrollable){
        scrollable = false;
        let dir = evt.deltaY > 0 ? 'right' : 'left';
        moveToNextSection(dir);
    }
}, { capture: false, passive: true });

setInterval(() => {
    scrollable = true;
}, timeout);

function moveToNextSection(dir){
    i++
    console.log('Move #'+i+' '+dir);
}