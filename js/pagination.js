function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
    var button = document.getElementById("scrollToTop");
    if (document.documentElement.scrollTop > 100) {
        button.style.display = "flex"; 
    } else {
        button.style.display = "none"; 
    }
};

function createPaginationControls() {
    var paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = ''; 

    var urlParams = new URLSearchParams(window.location.search);
    var itemsPerPage = parseInt(urlParams.get('count')) || 5;

    var totalPages = Math.ceil(selectCtg.length / itemsPerPage);

    var page = parseInt(urlParams.get('page')) || 1;
    currentPage = page
    renderCards()
    
    var prevLink = document.createElement('a');
    prevLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
        </svg>
    `;

    urlParams.set('page', currentPage - 1);
    var newUrl = '?' + urlParams.toString();

    prevLink.href = newUrl;
    prevLink.className = currentPage === 1 ? 'disabled' : 'on'; 
    paginationContainer.appendChild(prevLink);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.innerText = i;

        urlParams.set('page', i);
        var newUrl = '?' + urlParams.toString();
        
        pageLink.href = newUrl;
        pageLink.className = currentPage === i ? 'active' : 'NotActive'; 
        paginationContainer.appendChild(pageLink);
    }

    var nextLink = document.createElement('a');
    nextLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg>
    `;

    urlParams.set('page', currentPage + 1);
    var newUrl = '?' + urlParams.toString();

    nextLink.href = newUrl;
    nextLink.className = currentPage === totalPages ? 'disabled' : 'on'; 
    paginationContainer.appendChild(nextLink);

    var bCounts = document.querySelectorAll('#pagination-count a');
    bCounts.forEach(link => {
        link.className = itemsPerPage === Number(link.textContent) ? 'active' : 'NotActive'; 
    });

    var pageS = document.getElementById('page');
    var size = urlParams.get('size') || 'small';
    if (size === 'small') size = 'М';
    else
    {
        pageS.classList.add("big")
        size = 'Б';
    }
    var bsize = document.querySelectorAll('#pagination-size a');
    bsize.forEach(link => {
        link.className = size === link.textContent ? 'active' : 'NotActive'; 
    });
    console.log(size)
}

function updateCount(count) {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('page');
    urlParams.set('count', count);

    var newUrl = window.location.pathname + '?' + urlParams.toString();
    
    window.location.href = newUrl;
}

function resize(size)
{
    var page = document.getElementById('page');
    var urlParams = new URLSearchParams(window.location.search);

    if (size===1)
    {
        size="small"
    }
    if (size===2)
    {
        size="big"
    }

    var urlParams = new URLSearchParams(window.location.search);
    urlParams.set('size', size);

    var newUrl = window.location.pathname + '?' + urlParams.toString();
    
    window.location.href = newUrl;
}

function updCtg(ctg)
{
    var urlParams = new URLSearchParams(window.location.search);
    var ctg2 = urlParams.get('ctg');

    if (ctg===ctg2) return

    urlParams.set('ctg', ctg);
    urlParams.delete('page');
    var newUrl = window.location.pathname + '?' + urlParams.toString();
    
    window.location.href = newUrl;
}
createPaginationControls();
