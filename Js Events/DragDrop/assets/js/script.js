const boxes = document.querySelectorAll('.box');
const dropZones = document.querySelectorAll('.dropzone');

let draggedBox = null;

function getColorClass(element) {
    return ['red', 'green', 'blue'].find(color => element.classList.contains(color));
}

boxes.forEach(box => {
    box.addEventListener('dragstart', (e) => {
        draggedBox = e.currentTarget;
        e.dataTransfer.setData('text/plain', 'dragging');
    });

    box.addEventListener('dragend', () => {
        draggedBox = null;
    });
});


dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();

        if (!draggedBox) return;

        const boxColor = getColorClass(draggedBox);
        const zoneColor = getColorClass(dropZone);

        if (boxColor && zoneColor && boxColor === zoneColor) {
            dropZone.appendChild(draggedBox);
        }
        else {
            alert('Wrong drop zone! Try again.');
        }
    });
});