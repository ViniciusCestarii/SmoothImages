const imageTracker = document.getElementById("image-track");
let mouseXPosition ="0", percentage = 0, prevPercentage = 0;

window.onmousedown = e => {
    mouseXPosition = e.clientX // mouse x position;
}

window.onmousemove = e => {
    if (mouseXPosition === "0") return;

    const mouseDelta = parseFloat(mouseXPosition) - e.clientX;
    const maxDelta = window.innerWidth/2;

    const nextPercentageUnconstrained = prevPercentage + (mouseDelta / maxDelta) * -100;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    percentage = nextPercentage; //storing  to update the prevPercentage when mouse released

    //track.style.transform = `translate(${nextPercentage}%, -50%)`;
    imageTracker.animate({
        transform: `translate(${percentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of imageTracker.getElementsByClassName("image")){
        //image.style.objectPosition = `${nextPercentage + 100}% 50%`;
        image.animate({
            objectPosition: `${percentage + 100}% 50%`//center = 50%
        }, { duration: 1200, fill: "forwards"});
    }
}

window.onmouseup = () => {
    mouseXPosition = "0";
    prevPercentage = percentage;
}