'use strict';

function addTOC() {
    var tocElement, bodyContent, mainElement;

    tocElement = document.createElement('nav');
    tocElement.setAttribute('id', 'toc');

    bodyContent = document.body.innerHTML;

    mainElement = document.createElement('main');
    mainElement.insertAdjacentHTML('afterbegin', bodyContent);

    generateTOC(tocElement, mainElement);

    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('afterbegin', tocElement.outerHTML);
    document.body.insertAdjacentHTML('beforeend', mainElement.outerHTML);
    document.body.classList.add('toc-loaded');

    // FUNCTIONS

    function generateTOC(tocElement, mainElement) {
        var headlineElements, currentElement, currentHeadlineElement, currentHeadlineLinkElement, i;

        headlineElements = mainElement.querySelectorAll('h1, h2, h3, h4, h5, h6');

        for (i = 0; i < headlineElements.length; i++) {
            currentElement = headlineElements[i];
            currentElement.setAttribute('id', i);

            currentHeadlineLinkElement = document.createElement('a');
            currentHeadlineLinkElement.setAttribute('href', '#' + i);
            currentHeadlineLinkElement.innerHTML = currentElement.innerHTML;

            currentHeadlineElement = document.createElement('div');
            currentHeadlineElement.classList.add(currentElement.tagName.replace('H', 'level-'));
            currentHeadlineElement.insertAdjacentHTML('afterbegin', currentHeadlineLinkElement.outerHTML);

            tocElement.insertAdjacentHTML('beforeend', currentHeadlineElement.outerHTML);
        }
    }
}

document.addEventListener('DOMContentLoaded', addTOC, false);