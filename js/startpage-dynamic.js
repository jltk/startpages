(function() {
    // link management with localStorage
    var linkOptions = {
        fetchLinks: function() {
            var links = new Array;
            var links_str = localStorage.getItem('link');
            if (links_str != null) {
                links = JSON.parse(links_str);
            }
            return links;
        },
        removeLink: function() {
            var id = this.getAttribute('id');
            var links = linkOptions.fetchLinks();
            links.splice(id, 1);
            localStorage.setItem('link', JSON.stringify(links));
            linkOptions.showLinks();
            return false;
        },
        showLinks: function() {
            var links = linkOptions.fetchLinks();
            var html = '<ul>';
            for (var i=0; i<links.length; i++) {
                html += '<li><a href="https://' + links[i] + '">' + links[i] + '</a><button class="remove" id="' + i + '">x</button></li>';
            };
            html += '</ul>';
            document.getElementById('links').innerHTML = html;
            var buttons = document.getElementsByClassName('remove');
            for (var i=0; i<buttons.length; i++) {
                buttons[i].addEventListener('click', linkOptions.removeLink);
            };
        },
        addLink: function() {
            var linkNew = document.getElementById('urlInput').value;
            var links = linkOptions.fetchLinks();
            links.push(linkNew);
            localStorage.setItem('link', JSON.stringify(links));
            linkOptions.showLinks();
            document.getElementById('urlInput').value = "";
            return false;
        }
    };
    document.getElementById('addUrl').addEventListener('click', linkOptions.addLink);
    linkOptions.showLinks();

    // toggle editable elements visibility
    var toggleMenu = {
        btnToggle: document.getElementById('btnToggle'),
        menu: document.getElementById('panel'),
        btnClose: document.getElementsByClassName('remove'),
        btnClick: function() {
            toggleMenu.btnToggle.addEventListener('click', function() {
                toggleMenu.menu.classList.toggle('hide');
                for (i=0; i<toggleMenu.btnClose.length; i++) {
                    if (toggleMenu.btnClose[i].style.display == "none") {
                        toggleMenu.btnClose[i].style.display = "block";
                    } else {
                        toggleMenu.btnClose[i].style.display = "none";
                    }
                };
            });
        },
        btnCloseVis: function() {
            for (i=0; i<toggleMenu.btnClose.length; i++) {
                if (toggleMenu.btnClose[i].style.display = "block") {
                    toggleMenu.btnClose[i].style.display = "none";
                } else {
                    toggleMenu.btnClose[i].style.display = "block";
                }
            };
        }
    };
    toggleMenu.btnClick();
    document.onload = toggleMenu.btnCloseVis();
    // todo: editable headlines for boxes, addable boxes
})();
