var tabs = document.querySelectorAll('.tab');
var contents = document.querySelectorAll('.content');

// Page refresh olanda butun contentler gizli qalsin.
contents.forEach(content => {
    content.style.display = 'none';
});

tabs.forEach(tab => {
    tab.classList.remove('active');
});

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        showContent(index);
    });
});

function showContent(index) {
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => {
        content.style.display = 'none';
    });

    tabs[index].classList.add('active');
    contents[index].style.display = 'block';
}
