import { useEffect } from 'react';
import './home.css';

export default function Draggable() {

useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
    const welcomeVid = document.querySelector('.welcome-vid');
    let isDragging = false;
    let dragStartX, dragStartY;

    welcomeVid.addEventListener('mouseDown', function(e) {
        isDragging = true;
        dragStartX = e.clientX - welcomeVid.offsetLeft;
        dragStartY = e.clientY - welcomeVid.offsetTop;
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const newX = e.clientX - dragStartX;
            const newY = e.clientY - dragStartY;
            welcomeVid.style.left = `${newX}px`;
            welcomeVid.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    })
    });
})}

// dragElement(document.getElementById("mydiv"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }